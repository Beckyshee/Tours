-- CREATE OR ALTER PROCEDURE fetchAllUsers
-- AS
-- BEGIN
--     SELECT * FROM Users
-- END
 



CREATE PROCEDURE fetchOneUser (@UserID VARCHAR(200))
AS
BEGIN
    SELECT * FROM Users WHERE UserID = @UserID
END


-- SELECT * FROM Employees WHERE email = 'becky@yopmail.com'