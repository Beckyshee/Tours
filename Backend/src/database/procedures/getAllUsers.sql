-- CREATE OR ALTER PROCEDURE fetchAllUsers
-- AS
-- BEGIN
--     SELECT * FROM Users
-- END
 



CREATE PROCEDURE fetchOneUser (@user_id VARCHAR(200))
AS
BEGIN
    SELECT * FROM Users WHERE user_id = @user_id
END


-- SELECT * FROM Employees WHERE email = 'becky@yopmail.com'