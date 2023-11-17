CREATE OR ALTER PROCEDURE registerUser(
    @UserID VARCHAR(255),
    @fullname VARCHAR(200),
    @email VARCHAR(300),
    @phone_no VARCHAR(20),
    @password VARCHAR(200)
)
AS
BEGIN

    INSERT INTO Users(UserID, fullname, email, phone_no, password)
    VALUES(@UserID, @fullname, @email, @phone_no,@password)

END