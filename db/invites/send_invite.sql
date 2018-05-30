-- This query will add an invite for user $1 to trip $2.

INSERT INTO invites (userid, tripid)
VALUES ($1, $2);