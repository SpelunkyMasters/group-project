update timeline
set "likes" = array_remove(likes, $2)
where postid = $1;