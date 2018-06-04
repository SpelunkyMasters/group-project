INSERT INTO post_comments (postid, userid, comment_text)
VALUES ($1, $2, $3)
RETURNING *