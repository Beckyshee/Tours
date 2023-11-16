CREATE TABLE Tours (
  TourID INT PRIMARY KEY,
  tourTitle VARCHAR(255) NOT NULL,
  shortDescription TEXT NOT NULL,
  Destination VARCHAR(255) NOT NULL,
  Duration INT NOT NULL,
  Price INT NOT NULL,
  tourType VARCHAR(255) NOT NULL,
  tourImage VARCHAR(255)
  -- Status VARCHAR(255) DEFAULT 'Active'
);


USE Tours;
