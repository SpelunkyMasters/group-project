SELECT * FROM user_chat JOIN users ON users.userid=user_chat.userid WHERE tripid=$1
ORDER BY messageid