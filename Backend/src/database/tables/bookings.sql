CREATE TABLE Bookings (
  BookingID INT PRIMARY KEY,
  UserID INT REFERENCES Users(UserID),
  TourID INT REFERENCES Tours(TourID),
  Date DATE NOT NULL,
  Status VARCHAR(255) DEFAULT 'Pending',
  -- Add other relevant fields as needed
);
