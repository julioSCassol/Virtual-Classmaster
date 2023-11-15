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

CREATE TABLE courses(  
    id TEXT NOT NULL PRIMARY KEY,
    name TEXT,
    students TEXT[],
    teachers TEXT[],
    subjects TEXT[],
    created_at DATE
);
