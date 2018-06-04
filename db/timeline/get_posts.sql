SELECT * FROM timeline JOIN timeline_trips 
ON timeline.postid=timeline_trips.postid 
JOIN users ON timeline.userid=users.userid 
WHERE tripid=$1
ORDER BY timeline.postid