-- Change trip_name for tripid $1 to $2

UPDATE trips
SET trip_name = $2
WHERE tripid = $1