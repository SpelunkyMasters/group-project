SELECT * FROM post_comments 
JOIN users ON users.userid=post_comments.userid
WHERE postid=$1
ORDER BY commentid