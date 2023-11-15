// review.routes.ts

import express from 'express';
import * as reviewController from '../controllers/reviewControllers';

const router = express.Router();

// for a specific tour
// router.get('/tour/:tourId', reviewController.getReviewsByTourId);

// Create a new review
router.post('/', reviewController.createReview);

// Update a review
router.put('/:id', reviewController.updateReview);

// Delete a review
router.delete('/:id', reviewController.deleteReview);

export default router;
