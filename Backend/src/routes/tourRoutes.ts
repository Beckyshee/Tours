import express from "express";
import * as toursController from "../controllers/tourController";
import { verifyToken } from "../middleware/verifyToken";

const tour_router = express.Router();

tour_router.get("", toursController.getTours);
// tour_router.get('/:id', toursController.getTourById);
tour_router.post("/", toursController.createTour);
tour_router.put("/update/:TourID", verifyToken, toursController.updateTour);
tour_router.delete("/:TourID", verifyToken, toursController.deleteTour);

export default tour_router;
