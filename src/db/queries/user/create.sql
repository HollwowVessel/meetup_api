INSERT INTO users (username, email, password, role)
VALUES ($1, $2, $3, $4) RETURNING *
