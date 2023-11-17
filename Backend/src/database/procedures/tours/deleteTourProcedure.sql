-- sp_DeleteTour.sql

CREATE PROCEDURE sp_DeleteTour
  @id INT
AS
BEGIN
  -- Your stored procedure logic here
  -- For example:
  DELETE FROM tours WHERE TourID = @TourID;
END
