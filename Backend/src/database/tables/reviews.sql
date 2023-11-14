CREATE TABLE Reviews (
  ReviewID SERIAL PRIMARY KEY,
  UserID INT REFERENCES Users(UserID),
  TourID INT REFERENCES Tours(TourID),
  Rating INT NOT NULL,
  Comment TEXT,
  Date DATE NOT NULL,
  Status VARCHAR(255) DEFAULT 'Pending',
  -- Add other relevant fields as needed
);
