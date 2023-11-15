-- create posts table
CREATE TABLE posts(  
    id TEXT NOT NULL PRIMARY KEY,
    content TEXT,
    indexed_material TEXT,
    subjects_post TEXT,
    limit_date DATE,
    max_points INTEGER,
    created_at DATE,
    teacher TEXT REFERENCES users(id),
    course_id TEXT REFERENCES courses(id)
);