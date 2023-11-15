CREATE TABLE Bookings (
  fullname VARCHAR(100),
  BookingID INT PRIMARY KEY,
  UserID INT REFERENCES Users(UserID),
  TourID INT REFERENCES Tours(TourID),
  Date DATE NOT NULL,
  -- Status VARCHAR(255) DEFAULT 'Pending',
  
);
