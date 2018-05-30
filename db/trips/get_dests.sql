-- This will select all destinations and sub_destinations for the given tripid $1.
-- If no sub-destinations exist, the destinations will still be retrieved (with null for sub_dests info)

SELECT d.destid, tripid, dest_city, dest_country, dest_ord, sub_destid, sub_dest_name, sub_dest_ord FROM destinations d
LEFT OUTER JOIN sub_dests sd ON d.destid = sd.destid
WHERE tripid = $1;