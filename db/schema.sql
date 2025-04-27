-- Drop existing tables to avoid conflicts
DROP TABLE IF EXISTS looted_items;
DROP TABLE IF EXISTS killed_monsters;
DROP TABLE IF EXISTS sessions;

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  balance NUMERIC NOT NULL,
  damage BIGINT NOT NULL,
  damage_per_hour BIGINT NOT NULL,
  healing BIGINT NOT NULL,
  healing_per_hour BIGINT NOT NULL,
  loot BIGINT NOT NULL,
  raw_xp_gain BIGINT NOT NULL,
  raw_xp_per_hour BIGINT NOT NULL,
  session_start TIMESTAMP NOT NULL,
  session_end TIMESTAMP NOT NULL,
  session_length INTERVAL NOT NULL,
  supplies BIGINT NOT NULL,
  xp_gain BIGINT NOT NULL,
  xp_per_hour BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create killed_monsters table
CREATE TABLE IF NOT EXISTS killed_monsters (
  id SERIAL PRIMARY KEY,
  session_id INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  count INTEGER NOT NULL,
  name TEXT NOT NULL
);

-- Create looted_items table
CREATE TABLE IF NOT EXISTS looted_items (
  id SERIAL PRIMARY KEY,
  session_id INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  count INTEGER NOT NULL,
  name TEXT NOT NULL
);