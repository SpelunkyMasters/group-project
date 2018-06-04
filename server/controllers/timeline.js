module.exports={
        //new post on timeline
        postOnTimeline:(req, res, next)=>{
            const db=req.app.get('db');
            const{post_name, post_image, tripid}=req.body;
            db.timeline.new_post([post_name, post_image,req.user.userid, tripid])
            .then(post=>res.status(200).send(post[0]))
            .catch(err=>res.status(500).send(err))
        },
        //getting all the posts on tripid
        getAllPosts:(req, res, next)=>{
            const db=req.app.get('db');
            const{tripid}=req.params;
            db.timeline.get_posts(tripid)
            .then(posts=>res.status(200).send(posts))
            .catch(err=>res.status(500).send(err))
        },
        //deleting post by postid
        deletePost:(req, res, next)=>{
            const db=req.app.get('db');
            const{postid}=req.params;
            db.timeline.delete_post(postid)
            .then(()=>res.status(200).send())
            .catch(err=>res.status(500).send(err))
        },
        //like/dislike picture by postid
        likePost:(req,res, next)=>{
            const db=req.app.get('db');
            const{postid, like}=req.body;
            if(like){
                db.timeline.like_post([postid, req.user.userid])
                .then(()=>res.status(200).send())
                .catch(err=>res.status(500).send())
            }
            else{
                db.timeline.dislike_post([postid, req.user.userid])
                .then(()=>res.status(200).send())
                .catch(err=>res.status(500).send(err))

            }
        }
}