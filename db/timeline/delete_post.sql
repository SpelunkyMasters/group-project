DELETE FROM post_comments WHERE postid=$1;
DELETE FROM timeline WHERE postid=$1;
