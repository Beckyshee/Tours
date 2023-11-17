-- sp_CreateReview.sql

CREATE PROCEDURE sp_CreateReview
@ReviewID VARCHAR,
  @UserID VARCHAR,
  @TourID VARCHAR,
  @rating INT, -- Assuming Rating is not nullable based on your comment
  @comment TEXT
AS
BEGIN
  -- Your stored procedure logic here
  -- For example:
  INSERT INTO Reviews (ReviewID,UserID, TourID, Rating, Comment, Date)
  VALUES (@UserID, @TourID, @rating, @comment, GETDATE());
END
