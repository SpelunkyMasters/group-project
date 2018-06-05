-- Change trip details: $1 tripid, $2 trip_name, $3 startdate (timestamp: '2018-06-16 12:00:00'), $4 

UPDATE trips
SET trip_name = $2,
startdate = $3,
enddate = $4
WHERE tripid = $1
RETURNING *;