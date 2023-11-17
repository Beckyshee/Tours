-- sp_CreateBooking.sql

CREATE PROCEDURE sp_CreateBooking
  @UserID VARCHAR,
  @TourID VARCHAR,
  @bookingDate DATETIME
AS
BEGIN
  
  INSERT INTO bookings (UserID, TourID, BookingDate) VALUES (@UserID, @TourID, @bookingDate);
END
