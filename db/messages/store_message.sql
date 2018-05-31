INSERT INTO user_chat (userid, tripid, message_text)
VALUES ($1, $2, $3)
RETURNING *