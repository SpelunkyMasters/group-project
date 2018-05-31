
SELECT users.userid, first_name, last_name, email, picture  FROM invites JOIN users ON users.userid=invites.userid WHERE tripid=$1