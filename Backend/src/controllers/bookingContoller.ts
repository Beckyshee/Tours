// booking.controller.ts

import { Request, Response } from 'express';
import Connection from '../helpers/dbHelper';

const dbhelper = new Connection();

export const getBookings = async (req: Request, res: Response) => {
  try {
    const results = await dbhelper.query('SELECT * FROM bookings');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// export const getBookingById = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const results = await dbhelper.query('SELECT * FROM bookings WHERE bookingid = @id', {
//       id: +id, // CAUSING ERRORS
//     });
//     res.json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

export const createBooking = async (req: Request, res: Response) => {
  const { userId, tourId, bookingDate } = req.body;

  try {
    const newBooking = await dbhelper.execute('sp_CreateBooking', {
      userId,
      tourId,
      bookingDate,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, tourId, bookingDate } = req.body;

  try {
    const updatedBooking = await dbhelper.execute('sp_UpdateBooking', {
      id,
      userId,
      tourId,
      bookingDate,
    });

    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await dbhelper.execute('sp_DeleteBooking', { id });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
