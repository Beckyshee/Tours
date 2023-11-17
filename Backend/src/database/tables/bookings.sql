CREATE TABLE Bookings (
  fullname VARCHAR(100),
  BookingID VARCHAR(255) PRIMARY KEY,
  UserID VARCHAR(255) REFERENCES Users(UserID),
  TourID VARCHAR(255) REFERENCES Tours(TourID),
  bookingDate DATE NOT NULL,
  -- Status VARCHAR(255) DEFAULT 'Pending',
  
);


DROP TABLE Bookings;

USE Tours;
