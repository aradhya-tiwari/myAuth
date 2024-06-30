DROP TABLE users;
CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT,
        other_data TEXT 
        );
DROP TABLE userData;
CREATE TABLE userData(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        data BLOB NOT NULL
        )