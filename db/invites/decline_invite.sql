-- This query deletes the pending invite for userid $1 to trip $2;

DELETE FROM invites
WHERE userid = $1 AND tripid = $2;
