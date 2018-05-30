SELECT users.userid, first_name, last_name, email, picture FROM users
WHERE userid NOT IN (SELECT userid FROM invites WHERE tripid=$1)