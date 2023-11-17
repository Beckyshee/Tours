CREATE TABLE Reviews (
  ReviewID VARCHAR(255) PRIMARY KEY,
  UserID VARCHAR(255) REFERENCES Users(UserID),
  TourID VARCHAR(255) REFERENCES Tours(TourID),
  -- Rating INT NOT NULL,
  Comment TEXT,
  Date DATE NOT NULL,
  -- Status VARCHAR(255) DEFAULT 'Pending',
  -- Add other relevant fields as needed
);

USE Tours;
