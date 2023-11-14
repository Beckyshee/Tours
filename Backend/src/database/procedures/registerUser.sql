CREATE OR ALTER PROCEDURE registerUser(
    @employee_id VARCHAR(100),
    @fullname VARCHAR(200),
    @email VARCHAR(300),
    @phone_no VARCHAR(20),
    @password VARCHAR(200)
)
AS
BEGIN

    INSERT INTO Users(employee_id, fullname, email, phone_no, password)
    VALUES(@employee_id, @fullname, @email, @phone_no,@password)

END