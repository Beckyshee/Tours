import express from 'express';
import * as bookingsController from '../controllers/bookingContoller';

const router = express.Router();

router.get('/', bookingsController.getBookings);
// router.get('/:id', bookingsController.getBookingById);
router.post('/', bookingsController.createBooking);
router.put('/:id', bookingsController.updateBooking);
router.delete('/:id', bookingsController.deleteBooking);

export default router;
