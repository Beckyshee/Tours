-- sp_UpdateTour.sql

CREATE PROCEDURE sp_UpdateTour
@TourID VARCHAR(255),
  @tourTitle VARCHAR(255),
  @shortDescription TEXT,
  @Destination VARCHAR(255),
  @Duration INT,
  @Price INT,
  @tourType VARCHAR(255)
AS
BEGIN
  -- Your stored procedure logic here
  -- For example:
  UPDATE tours SET
  tourTitle = @tourTitle,
  ShortDescription = @shortDescription,
  Destination = @Destination,
  Duration = @Duration,
  Price = @Price,
  tourType = @tourType
  WHERE TourID = @TourID;
END
