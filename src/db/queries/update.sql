UPDATE meetups
SET name = $1, description = $2, tags = $3, timestamps = $4
WHERE id = $5
RETURNING *