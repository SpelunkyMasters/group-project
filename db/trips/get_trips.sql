-- Join between trips and user_trips - only pull trips for user $1

SELECT t.tripid, t.userid, trip_name, startdate, enddate FROM trips t 
JOIN user_trips ut 
ON t.tripid = ut.tripid
WHERE ut.userid = $1;