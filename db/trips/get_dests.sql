-- This will select all destinations and sub_destinations for the given tripid $1.
-- If no sub-destinations exist, the destinations will still be retrieved (with null for sub_dests info)

SELECT d.destid, tripid, dest_city, dest_country, dest_ord, sub_destid, sub_dest_name, sub_dest_ord FROM destinations d
LEFT OUTER JOIN sub_dests sd ON d.destid = sd.destid
WHERE tripid = $1;

SELECT d.destid, tripid, dest_name, dest_ord, d.lat as dest_lat, d.lng as dest_lng, sub_destid, sub_dest_name, sub_ord, sub_address, sd.lat as sub_lat, sd.lng as sub_lng FROM destinations d
LEFT OUTER JOIN sub_dests sd ON d.destid = sd.destid
WHERE tripid = $1;