// review.routes.ts

import express from 'express';
import * as reviewController from '../controllers/reviewControllers';

const review_router = express.Router();

// for a specific tour
// router.get('/tour/:tourId', reviewController.getReviewsByTourId);

// Create a new review
review_router.post('/', reviewController.createReview);

// Update a review
review_router.put('/:id', reviewController.updateReview);

// Delete a review
review_router.delete('/:id', reviewController.deleteReview);

export default review_router;
