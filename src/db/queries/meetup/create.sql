INSERT INTO meetups (name, description, tags, timestamps)
VALUES ($1, $2, $3, $4)
RETURNING *
