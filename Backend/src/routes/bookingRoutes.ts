import express from 'express';
import * as bookingsController from '../controllers/bookingContoller';

const booking_router = express.Router();

booking_router.get('/', bookingsController.getBookings);
// router.get('/:id', bookingsController.getBookingById);
booking_router.post('/', bookingsController.createBooking);
booking_router.put('/:id', bookingsController.updateBooking);
booking_router.delete('/:id', bookingsController.deleteBooking);

export default booking_router;
