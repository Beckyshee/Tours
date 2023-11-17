-- sp_DeleteReview.sql

CREATE PROCEDURE sp_DeleteReview
  @ReviewID VARCHAR
AS
BEGIN
--   
  DELETE FROM Reviews WHERE ReviewID = @ReviewID;
END
