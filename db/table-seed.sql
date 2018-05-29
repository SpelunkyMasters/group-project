CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    authid TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    picture TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS trips (
    tripid SERIAL PRIMARY KEY,
    trip_name VARCHAR(100) NOT NULL,
    userid INTEGER REFERENCES users(userid) NOT NULL
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
    dest_city VARCHAR(80) NOT NULL,
    dest_country VARCHAR(80) NOT NULL,
    dest_num INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sub_dests (
    sub_destid SERIAL PRIMARY KEY,
    destid INTEGER REFERENCES destinations(destid) NOT NULL,
    sub_dest_name VARCHAR(120) NOT NULL,
    description VARCHAR(150),
    sub_dest_num INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS trip_itinerary (
    tripid INTEGER REFERENCES trips(tripid) NOT NULL,
    destid INTEGER REFERENCES destinations(destid) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_chat (
    messageid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(userid) NOT NULL,
    tripid INTEGER REFERENCES trips(tripid) NOT NULL,
    message_text VARCHAR(250) NOT NULL
);





