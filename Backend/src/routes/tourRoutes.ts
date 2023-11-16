

import express from 'express';
import * as toursController from '../controllers/tourController';

const tour_router = express.Router();

tour_router.get('', toursController.getTours);
// tour_router.get('/:id', toursController.getTourById);
tour_router.post('/', toursController.createTour);
tour_router.put('/:id', toursController.updateTour);
tour_router.delete('/:id', toursController.deleteTour);

export default tour_router;
