CREATE TABLE Users (
    user_id VARCHAR(100) NOT NULL ,
    fullname VARCHAR(200) NOT NULL,
    email VARCHAR(300) NOT NULL UNIQUE,
    phone_no VARCHAR(20) NOT NULL UNIQUE,
    
    password VARCHAR(200) NOT NULL,
    role VARCHAR(20) Default 'user',
    -- welcomed BIT Default 0
)

-- DROP TABLE Employees

-- SELECT * FROM Employees

SELECT * FROM USERS WHERE EMAIL ='wanjirubecky.rw@gmail.com' 

UPDATE users SET role = 'admin' WHERE email = 'wanjirubecky.rw@gmail.com'