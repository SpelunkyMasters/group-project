require('dotenv').config();
const express=require('express');
const session=require('express-session');
const passport=require('passport');
const Auth0Strategy=require('passport-auth0');
const massive=require('massive');
const cors=require('cors');
const socket=require('socket.io');
const controller=require('./controllers/message_trip_user');
const controller2=require('./controllers/invite_dest');
const controller3=require('./controllers/timeline')
const iController=require('./controllers/itinerary_controller')
const tController=require('./controllers/travel_history')
const bodyParser=require('body-parser');
const S3=require('./controllers/S3');
const app=express();

const {
    SERVER_PORT,
    CONNECTION_STRING,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    SESSION_SECRET,
    SUCCESS_REDIRECT,
    FAILURE_REDIRECT
}=process.env;


//limit for S3 size
app.use(bodyParser.json({limit: '10mb'}));
app.use(cors());

massive(CONNECTION_STRING).then(db=>{
    console.log("Massive up and running")
    app.set('db', db)
})

app.use( express.static( `${__dirname}/../build` ) );

app.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))


app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
    domain:DOMAIN,
    clientID:CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    callbackURL:CALLBACK_URL,
    scope:'openid profile email'
    },
    function(accessToken, refreshToken, extraParams, profile, done){
    //db calls
    const db=app.get('db');
    const {picture,id}=profile;
    const {value}=profile.emails[0];
    const {familyName, givenName}=profile.name
    db.find_user([ id]).then( users=>{
        if(users[0]){
            return done(null, users[0].userid)
        } else {
            db.create_user([id, givenName, familyName, value, picture]).then(createdUser=>{
                return done(null, createdUser[0].userid)
            })
        }
    } )

}))

passport.serializeUser( (id, done)=>{
    //putting info in session
    return done(null, id)
})

passport.deserializeUser( (id, done)=>{
    app.get('db').find_session_user([id]).then(user=>{
        done(null, user[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
}))

app.get('/auth/me', (req,res)=>req.user ? res.status(200).send(req.user): res.status(401).send('Nice try sucka'))
app.get('/logout', function(req,res){
    req.logOut();
    res.redirect(FAILURE_REDIRECT)
    })


// AuthChecker for DeleteTrip
function authCheck(req, res, next) {
    const db = app.get('db')
        , { userid } = req.user
        , { tripid } = req.params;

    console.log(`User ${userid} is trying to delete trip ${tripid}`)
    
    db.trips.get_trip_userid(+tripid).then( result => {
        if( result[0].userid === userid) {
            next()
        } else {
            res.status(401).send('You are not the trip organizer')
        }
    }).catch(err => console.log('Error getting trip userid: ', err))
}


//                         MESSAGE TRIP USER

//storing the message
app.post('/api/message',controller.storeMessage)
//getting messages by trip
app.get('/api/messages/:id', controller.getMessages)
//deleting message
app.delete('/api/message/:id', controller.deleteMessage)
//getting  all the users that not yet invited
app.get('/api/notinvited/:id', controller.getAllUsers)
//getting all the users for trip
app.get('/api/users/:id', controller.getTripUsers)
//getting trips of current user
app.get('/api/trips/:id', controller.getUserTrips)
//deleting user from the trip
app.delete('/api/trip/:userid/:tripid', controller.deleteFromTrip)
//update user info
app.put('/api/user', controller.updateUser)
// update trip details
app.put('/api/trips/:tripid', controller.updateTrip);
// Delete the Trip - Will Check with Authentication Middleware
app.delete('/api/trips/:tripid', authCheck, controller.deleteTrip)



//////// Paul's Endpoints //////////
// Delete trip (need to update DB tables)
app.delete('/api/trips/:tripid', controller.deleteTrip)

// Create new trip
app.post('/api/trips/:userid', controller.createTrip)


//                           INVITE DESTINATION

//sending invite to user
app.post('/api/invite', controller2.sendInvite)
//get invited to the trip users
app.get('/api/tripusers/:id', controller2.getInvitedUsers)
//deleting invite from table
app.delete('/api/invite/:userid/:tripid', controller2.declineInvite)
// Get all user invites
app.get('/api/invites/:userid', controller2.getInvites)
// accepting invite by tripid(add to user_trips/delete from invites)
app.post('/api/invite/:tripid', controller2.acceptInvite)




//                         TIMELINE
//adding new post to timeline
app.post('/api/timeline', controller3.postOnTimeline)
//get all the posts from timeline
app.get('/api/timeline/:tripid', controller3.getAllPosts)
//delete post from by postid
app.delete('/api/timeline/:postid', controller3.deletePost)
//like/dislike post by postid
app.put('/api/timeline', controller3.likePost)
// posting comment 
app.post('/api/comment', controller3.postComment)
//getting comments by postid
app.get('/api/comment/:postid',controller3.getComments)
//deleting comment by commentid
app.delete('/api/comment/:commentid', controller3.deleteComment)

//                          ITINERARY STUFF
//get entire trip itinerary
app.get('/api/itinerary/:tripid', iController.getItinerary)
//add location to trip itinerary
app.post('/api/itinerary/:tripid', iController.addToItinerary)
//delete a destination
app.delete('/api/itinerary/dest/:destid', iController.deleteDestination)
//delete sub destination
app.delete('/api/itinerary/sub/:sub_destid', iController.deleteSubDestination)

//                          TRAVEL HISTORY
//get user travel history
app.get('/api/travel-history', tController.getUserHistory)
app.post('/api/travel-history', tController.addHistory)

//s3 component
S3(app);


//wrapping listen with socket
const io=socket(app.listen(SERVER_PORT,()=>console.log('Listening on port:'+SERVER_PORT)));


//setting up socket by the rooms
io.on('connection', socket => {
    // console.log('User Connected');
    socket.on('join room', data => {
    //   console.log('Room joined', data.room)
      socket.join(data.room);
      io.to(data.room).emit('room joined');
    })
    socket.on('message sent', data => {
        // console.log(data)
      io.emit(`${data.room} dispatched`, data.message);
    })
  
    socket.on('disconnect', () => {
    //   console.log('User Disconnected');
    })
  });
