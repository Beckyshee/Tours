import express from 'express';
import * as bookingsController from '../controllers/bookingContoller';
import { verifyToken } from '../middleware/verifyToken';

const booking_router = express.Router();

booking_router.get('/', bookingsController.getBookings);
// router.get('/:id', bookingsController.getBookingById);
booking_router.post('/',verifyToken, bookingsController.createBooking);
booking_router.put('/:BookingID', verifyToken, bookingsController.updateBooking);
booking_router.delete('/:BookingID', verifyToken, bookingsController.deleteBooking);

export default booking_router;
