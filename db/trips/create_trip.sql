-- 1. Create the trip with userid $1 as organizer. 2. add that user and trip to the user_trips table.
-- WITH/AS creates a temporary table that disappears after the query is done.

WITH trip_creation AS (
    INSERT INTO trips (userid, trip_name)
    VALUES($1, 'New Vacation')
    RETURNING tripid
)
INSERT INTO user_trips(userid, tripid)
VALUES ($1, (SELECT tripid from trip_creation))
RETURNING *;
