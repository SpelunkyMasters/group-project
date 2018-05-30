module.exports={
    sendInvite:(req, res, next)=>{
        const db=req.app.get('db')
        const{userid, tripid}=req.body;
        db.invites.send_invite([userid, tripid])
        .then(()=>res.status(200).send())
        .catch(err=>res.status(500).send(err))
    }
}