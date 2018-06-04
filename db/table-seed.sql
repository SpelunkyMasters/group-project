CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    authid TEXT NOT NULL,
    first_name VARCHAR(80) NULL,
    last_name VARCHAR(80) NULL,
    email VARCHAR(80) NULL,
    picture TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS trips (
    tripid SERIAL PRIMARY KEY,
    trip_name VARCHAR(100) NOT NULL,
    userid INTEGER REFERENCES users(userid) NOT NULL,
    startdate TEXT,
    enddate TEXT
);

CREATE TABLE IF NOT EXISTS user_trips (
    userid INTEGER REFERENCES users(userid) NOT NULL,
    tripid INTEGER REFERENCES trips(tripid) NOT NULL
);

CREATE TABLE IF NOT EXISTS invitations (
    userid INTEGER REFERENCES users(userid) NOT NULL,
    tripid INTEGER REFERENCES trips(tripid)
);

CREATE TABLE IF NOT EXISTS destinations (
    destid SERIAL PRIMARY KEY,
    tripid INTEGER REFERENCES trips(tripid) NOT NULL,
    dest_name TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    dest_address TEXT,
    dest_ord INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sub_dests (
    sub_destid SERIAL PRIMARY KEY,
    destid INTEGER REFERENCES destinations(destid) NOT NULL,
    sub_dest_name TEXT NOT NULL,
    sub_address TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    sub_ord INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS user_chat (
    messageid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(userid) NOT NULL,
    tripid INTEGER REFERENCES trips(tripid) NOT NULL,
    message_text VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS timeline (
    postid SERIAL PRIMARY KEY,
    post_name VARCHAR(90) NOT NULL,
    post_image VARCHAR(250) NOT NULL,
    likes INTEGER ARRAY[20],
    userid INTEGER REFERENCES users(userid) NOT NULL
);

CREATE TABLE IF NOT EXISTS timeline_trips (
    postid INTEGER REFERENCES timeline(postid) NOT NULL,
    tripid INTEGER REFERENCES trips(tripid) NOT NULL
);

CREATE TABLE IF NOT EXISTS post_comments (
    commentid SERIAL PRIMARY KEY,
    postid INTEGER REFERENCES timeline(postid) NOT NULL,
    userid INTEGER REFERENCES users(userid) NOT NULL,
    comment_text VARCHAR(250) NOT NULL
);





