SELECT * FROM timeline tl 
JOIN users u ON tl.userid = u.userid 
WHERE tripid = $1
ORDER BY postid;