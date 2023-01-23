DROP DATABASE IF EXISTS bookmarks_dev;
CREATE DATABASE bookmarks_dev;

\c bookmarks_dev;

CREATE TABLE bookmarks (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 url TEXT,
 category TEXT,
 is_favorite BOOLEAN
);

-- TABLE FOR NEW DATABASE
DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
 id SERIAL PRIMARY KEY,
 reviewer TEXT,
 title TEXT,-- NOT NULL OR CREATE A VALIDATIONS FOR THOSE THAT ARE REQUIRED 
 content TEXT,
 rating NUMERIC,--  NUMERIC OR DECIMAL
 CHECK (rating >= 0 AND rating <= 5),

 bookmark_id INTEGER REFERENCES bookmarks (id)--  BOOKAMRKS FOREIGN KEY --> bookmark_id
 ON DELETE CASCADE
);