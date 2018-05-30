-- Delete the associated sub destinations before deleting the destination itself.

DELETE FROM sub_dests WHERE destid = $1;
DELETE FROM destinations WHERE destid = $1;