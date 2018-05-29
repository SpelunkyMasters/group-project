INSERT INTO users 
(authid, first_name, last_name, email, picture)
VALUES ( $1, $2, $3, $4, $5)
RETURNING *;