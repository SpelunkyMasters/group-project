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
app.use(express.json({limit: '10mb'}));
app.use(cors());

massive(CONNECTION_STRING).then(db=>{
    console.log("Massive up and running")
    app.set('db', db)
})
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


//                           INVITE DESTINATION

//sending invite to user
app.post('/api/invite', controller2.sendInvite)
//get invited to the trip users
app.get('/api/tripusers/:id', controller2.getInvitedUsers)
//deleting invite from table
app.delete('/api/invite/:userid/:tripid', controller2.declineInvite)

//s3 component
S3(app);


//wrapping listen with socket
const io=socket(app.listen(SERVER_PORT,()=>console.log('Listening on port:'+SERVER_PORT)));


//setting up socket by the rooms
io.on('connection', socket => {
    console.log('User Connected');
    socket.on('join room', data => {
      console.log('Room joined', data.room)
      socket.join(data.room);
      io.to(data.room).emit('room joined');
    })
    socket.on('message sent', data => {
        console.log(data)
      io.emit(`${data.room} dispatched`, data.message);
    })
  
    socket.on('disconnect', () => {
      console.log('User Disconnected');
    })
  });
