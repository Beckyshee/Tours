CREATE TABLE Users (
    UserID VARCHAR(255) PRIMARY KEY NOT NULL,
    fullname VARCHAR(200) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    phone_no VARCHAR(20) NOT NULL UNIQUE,
    
    password VARCHAR(200) NOT NULL,
    role VARCHAR(20) Default 'user',
    -- welcomed BIT Default 0
)

-- DROP TABLE Users;

-- DROP DATABASE Tours;

SELECT * FROM Users

SELECT * FROM Users WHERE email ='wanjirubecky.rw@gmail.com' 

UPDATE Users SET role = 'admin' WHERE email = 'wanjirubecky.rw@gmail.com'



USE Tours2;