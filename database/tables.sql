-- Active: 1699558849946@@127.0.0.1@5432@default
-- create users table
CREATE TABLE users(
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT,
    email TEXT,
    hash TEXT,
    salt TEXT,
    is_teacher BOOLEAN,
    created_at DATE
);

-- create courses table
CREATE TABLE courses(  
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT,
    students TEXT[],
    teachers TEXT[],
    subjects TEXT[],
    created_at DATE
);
-- create posts table
CREATE TABLE posts(  
    id TEXT NOT NULL PRIMARY KEY,
    content TEXT,
    indexed_material TEXT,
    subjects_post TEXT[],
    limit_date DATE,
    max_points INTEGER,
    created_at DATE,
    teacher TEXT REFERENCES users(id),
    course_id TEXT REFERENCES courses(id)
);

