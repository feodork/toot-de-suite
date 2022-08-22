DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS toots CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE toots (
  id SERIAL PRIMARY KEY,
  facilities_id INT,
  gender TEXT,
  open_hours TEXT,
  accessible BOOLEAN
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  date TIMESTAMP DEFAULT current_timestamp,
  user_id SERIAL REFERENCES users (id) ON DELETE CASCADE,
  toot_id SERIAL REFERENCES toots (id) ON DELETE CASCADE
);
