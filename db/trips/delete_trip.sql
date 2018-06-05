-- All data related to tripid $1 will be deleted first, then the trip will be deleted from trips.

DELETE FROM post_comments pc WHERE postid in (SELECT tt.postid FROM trips WHERE )
DELETE FROM sub_dests sd WHERE sd.destid IN (SELECT d.destid FROM destinations d WHERE tripid = $1);
DELETE FROM destinations WHERE tripid = $1;
DELETE FROM trip_itinerary WHERE tripid = $1;
DELETE FROM invitations WHERE tripid $1;
DELETE FROM user_trips WHERE tripid $1;
DELETE FROM user_chat WHERE tripid $1;
DELETE FROM trips WHERE tripid $1;