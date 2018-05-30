-- Similar to add_destination - just for sub_dests

INSERT INTO sub_dests (destid, sub_dest_name, sub_dest_ord)
VALUES ($1, $2, (SELECT COUNT(*) FROM sub_dests WHERE destid = $1) + 1)
RETURNING *;