module.exports={
    updateMessage(oldPosts,post){
    if(post[0]===null) {
        let posts=oldPosts.filter(e=> e.postid!==post[1])
        return posts}
      else if(post[1]===null){
        let posts=oldPosts.slice()
        //finding post that was liked/ disliked and push or remove userid based on like or dislike happened
        posts.forEach((e,i,arr)=>e.postid===post[2]? post[3]? arr[i].likes.push(post[0]): arr[i].likes.splice(arr[i].likes.indexOf(post[0]), 1):e)
        return posts
      }
      else{ return post}
    }
      
}