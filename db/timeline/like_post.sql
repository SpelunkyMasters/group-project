update timeline
set "likes" = array_append(likes, $2)
where postid = $1;