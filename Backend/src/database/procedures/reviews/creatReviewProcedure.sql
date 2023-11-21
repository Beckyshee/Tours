-- sp_CreateReview.sql

CREATE PROCEDURE sp_CreateReview
@ReviewID VARCHAR,
  @UserID VARCHAR,
  @TourID VARCHAR, 
  @comment TEXT
AS
BEGIN
  
  INSERT INTO Reviews (ReviewID,UserID, TourID, Comment)
  VALUES (@ReviewID,@UserID, @TourID, @comment);
END
