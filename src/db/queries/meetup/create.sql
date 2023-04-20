INSERT INTO meetups (name, description, tags, timestamps, participants, creator_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *
