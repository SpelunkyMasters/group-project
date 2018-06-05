let fns=require('../../utils/functions');

test('postid of 1st element should be 2',()=>{
    var oldPosts=[{postid:1}, {postid:2}]
    var post=[null, 1]
    let result=fns.updateMessage(oldPosts,post);
    expect(result[0].postid).toBe(2);
})
test('length of likes should be 1 in 1st element',()=>{
    var oldPosts=[{postid:1, likes:[]}, {postid:2, likes:[]}]
    var post=[1, null, 1, true]
    let result=fns.updateMessage(oldPosts, post);
    expect(result[0].likes.length).toBe(1);
})
test('length of likes should be 0 in 1st element',()=>{
    var oldPosts=[{postid:1, likes:[1]}, {postid:2, likes:[]}]
    var post=[1, null, 1, false]
    let result=fns.updateMessage(oldPosts, post);
    expect(result[0].likes.length).toBe(0);
})
test('should return whatever was passed in',()=>{
    var oldPosts=[{postid:1, likes:[]}, {postid:2, likes:[]}]
    var post=[1, 1, null, false]
    let result=fns.updateMessage(oldPosts, post);
    expect(result.length).toBe(post.length);
})
test('length of likes should not change and be 0 ',()=>{
    var oldPosts=[{postid:1, likes:[]}, {postid:2, likes:[]}]
    var post=[1, null, 3, false]
    let result=fns.updateMessage(oldPosts, post);
    expect(result[0].likes.length+result[0].likes.length).toBe(0);
})
