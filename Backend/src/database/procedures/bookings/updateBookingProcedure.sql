-- sp_UpdateBooking.sql

CREATE PROCEDURE sp_UpdateBooking
  @BookingID VARCHAR,
  @UserID VARCHAR,
  @TourID VARCHAR,
  @bookingDate DATETIME
AS
BEGIN
  
  UPDATE bookings SET UserID = @UserID, TourId = @TourID, BookingDate = @bookingDate WHERE BookingId = @BookingID;
END
