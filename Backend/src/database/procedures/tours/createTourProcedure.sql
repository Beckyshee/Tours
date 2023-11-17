

CREATE PROCEDURE sp_CreateTour
  @tourTitle VARCHAR(255),
  @shortDescription TEXT,
  @Destination VARCHAR(255),
  @Duration INT,
  @Price INT,
  @tourType VARCHAR(255)
AS
BEGIN
  -- 
  INSERT INTO tours (tourTitle, shortDescription, Destination, Duration, Price, tourType)
  VALUES (@tourTitle, @shortDescription, @Destination, @Duration, @Price, @tourType);
END
