UPDATE meetups
SET name = $1, description = $2, tags = $3, timestamps = $4, participants = $5
WHERE id = $6
RETURNING *