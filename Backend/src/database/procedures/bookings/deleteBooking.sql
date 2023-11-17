-- sp_DeleteBooking.sql

CREATE PROCEDURE sp_DeleteBooking
  @BookingID VARCHAR
AS
BEGIN
  -- Your stored procedure logic here
  -- For example:
  DELETE FROM bookings WHERE BookingID = @BookingID;
END
