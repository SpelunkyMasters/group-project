-- Eventually, we need to figure out how to re-order the sub_dests when one gets deleted.

DELETE FROM sub_dests
WHERE sub_destid = $1;