-- This query deletes the pending invite for userid $1 to trip $2;

DELETE FROM invitations
WHERE userid = $1 AND tripid = $2;
