
INSERT INTO timeline (post_name, post_image, userid, likes, tripid)
VALUES($1, $2, $3, '{}', $4)
RETURNING *;