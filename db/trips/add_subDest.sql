-- Similar to add_destination - just for sub_dests
--Cody-- Updated column names

INSERT INTO sub_dests (destid, sub_dest_name, sub_address, lat, lng, place_id, sub_ord)
VALUES ($1, $2, $3, $4, $5, $6, (SELECT COUNT(*) FROM sub_dests WHERE destid = $1) + 1)
RETURNING *;