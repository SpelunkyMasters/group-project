-- This query first adds user $1 to trip $2, then deletes invite from invitations table.

INSERT INTO user_trips (userid, tripid)
VALUES($1, $2);

DELETE FROM invites
WHERE userid = $1 AND tripid = $2;