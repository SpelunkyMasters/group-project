-- Adds a destination with the order number based on how many destinations are already on the trip.
-- We will just need to figure out how to re-number the order numbers when a destination gets 
-- moved or deleted.
--Cody-- updated columns

INSERT INTO destinations (tripid, dest_name, lat, lng, dest_ord)
VALUES ($1, $2, $3, $4, (SELECT COUNT(*) FROM destinations WHERE tripid = $1) + 1)
RETURNING *;