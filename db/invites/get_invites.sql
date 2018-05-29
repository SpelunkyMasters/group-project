-- This query will grab all pending invites for the user with userid of $1

SELECT trip_name, first_name, last_name FROM trips t 
JOIN users u ON t.userid = u.userid 
WHERE t.tripid IN (SELECT i.tripid FROM invitations i WHERE i.userid = $1);