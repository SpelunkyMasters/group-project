WITH post_creation AS (
    INSERT INTO timeline (post_name, post_image, userid, likes)
    VALUES($1, $2, $3, '{}')
    RETURNING postid
)
INSERT INTO timeline_trips(tripid, postid)
VALUES ($4, (SELECT postid from post_creation));
SELECT * FROM timeline JOIN users on timeline.userid=users.userid
WHERE post_name=$1 AND post_image=$2 AND timeline.userid=$3