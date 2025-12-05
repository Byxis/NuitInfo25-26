CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    has_finished_game1 BOOLEAN DEFAULT FALSE,
    has_finished_game2 BOOLEAN DEFAULT FALSE,
    has_finished_game3 BOOLEAN DEFAULT FALSE,
    has_finished_game4 BOOLEAN DEFAULT FALSE
); 