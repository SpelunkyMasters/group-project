module.exports={
    //storing invite 
    sendInvite:(req, res, next)=>{
        const db=req.app.get('db')
        const{userid, tripid}=req.body;
        db.invites.send_invite([userid, tripid])
        .then(()=>res.status(200).send())
        .catch(err=>res.status(500).send(err))
    },
    //getting invited users on trip
    getInvitedUsers:(req, res, next)=>{
        const db=req.app.get('db')
        const{id}=req.params;
        db.invites.get_invited_users([id])
        .then((users)=>res.status(200).send(users))
        .catch(err=>res.status(500).send(err))        
    },
    //deleting invite from table
    declineInvite:(req, res, next)=>{
        const db=req.app.get('db')
        const{userid, tripid}=req.params;
        db.invites.decline_invite([userid, tripid])
        .then(()=>res.status(200).send())
        .catch(err=>res.status(500).send(err))          
    },
    // get all user's invites
    getInvites: (req, res, next) => {
        const db = req.app.get('db')
            , { userid } = req.params;
  
        db.invites.get_invites(+userid)
        .then( invites => {res.status(200).send(invites);})
        .catch( err => res.status(500).send(err) );
    },
    //accepting invite based on tripid
    acceptInvite: (req, res, next)=>{
        const db=req.app.get('db')
        const {tripid}=req.params;
        db.invites.accept_invite(req.user.userid, tripid)
        .then(()=>res.status(200).send())
        .catch(err=>res.status(500).send(err))
    }

}