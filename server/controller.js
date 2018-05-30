module.exports={
        //getting all the messages by trip
     getMessages:(req, res, next)=>{
        const db=req.app.get('db');
        const{id}=req.params;
        db.get_messages(id)
        .then(messages=>res.status(200).send(messages))
        .catch(err=>res.status(500).send(err))
    },
        // storing message 
    storeMessage:(req,res,next)=>{
        const db=req.app.get('db');
        const{message_text,tripid}= req.body;
        
        console.log('something', req.user.userid)
        console.log('body', message_text, tripid)
        db.store_message([req.user.userid, tripid, message_text])
        .then(()=>res.status(200).send())
        .catch(err=>res.status(500).send(err))
    }
}