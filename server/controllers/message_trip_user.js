module.exports={
        //getting all the messages by trip
     getMessages:(req, res, next)=>{
        const db=req.app.get('db');
        const{id}=req.params;
        db.messages.get_messages(id)
        .then(messages=>res.status(200).send(messages))
        .catch(err=>res.status(500).send(err))
    },
        // storing message 
    storeMessage:(req,res,next)=>{
        const db=req.app.get('db');
        const{message_text,tripid}= req.body;
        db.messages.store_message([req.user.userid, tripid, message_text])
        .then(message=>res.status(200).send(message))
        .catch(err=>res.status(500).send(err))
    },
    //deleting message
    deleteMessage:(req,res,next)=>{
        const db=req.app.get('db');
        const{id}= req.params;
        db.messages.delete_message([id])
        .then(()=>res.status(200).send())
        .catch(err=>res.status(500).send(err))
    },
    //getting all the users based on trip
    getTripUsers:(req,res,next)=>{
        const db=req.app.get('db');
        const {id}=req.params;
        db.users.get_users(id)
        .then(users=>res.status(200).send(users))
        .catch(err=>res.status(500).send(err))
    },
    //getting all the trips for current user
    getUserTrips:(req, res, next)=>{
        const db=req.app.get('db')
        const {id}=req.params;
        db.trips.get_trips(id)
        .then(trips=>res.status(200).send(trips))
        .catch(err=>res.status(500).send(err))

    },
    //getting all the users that not invited to trip
    getAllUsers:(req,res,next)=>{
        const db=req.app.get('db');
        const {id}=req.params;
        db.users.get_users_not_invited(id)
        .then(users=>res.status(200).send(users))
        .catch(err=>res.status(500).send(err))
    },
    //deleting user from trip
    deleteFromTrip:(req, res,next)=>{
        const db=req.app.get('db');
        const {userid, tripid}=req.params;
        db.users.delete_from_trip([userid, tripid])
        .then(()=>res.status(200).send())
        .catch(err=>res.status(500).send(err))
    },
    //updating user info
    updateUser:(req, res, next)=>{
        const db=req.app.get('db');
        const{userid, first_name, last_name, email}=req.body;
        db.users.update_user([userid, first_name, last_name, email])
        .then(user=>res.status(200).send(user))
        .catch(err=>res.status(500).send(err))
    },
    //updating trip info
    updateTrip: (req, res, next) => {
        const db = req.app.get('db')
            , { tripid } = req.params
            , { trip_name, startdate, enddate } = req.body;
        db.trips.update_trip([+tripid, trip_name, startdate, enddate])
        .then( trip => {res.status(200).send(trip[0])})
        .catch( err => res.status(500).send(err))
    },
    createTrip: (req, res, next) => {
        const db = req.app.get('db')
        , { userid } = req.params;
        
        db.trips.create_trip(+userid).then( trip => {
            res.status(200).send(trip[0])
        }).catch( err => res.status(500).send(err))
    },
    deleteTrip: (req, res, next) => {
        const db = req.app.get('db')
            , { tripid } = req.params
            , tripToDelete = + tripid; 
        
        db.trips.delete_trip(tripToDelete).then( () => {
            res.status(200).send(`Trip ${tripid} successfully deleted`);
        }).catch(err => console.log('Error deleting trip: ', err))
    }
    
}