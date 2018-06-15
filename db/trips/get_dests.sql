--Cody-- Making a query to just get main destinations so we can check if a
-- destination is in here already before adding it

select * from destinations
where tripid = $1