import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createBooking,
  getMyBookings,
  getBookedSeats,
  checkBooking
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/", protect, createBooking); 
router.get("/my-bookings", protect, getMyBookings);
router.get("/seats", protect, getBookedSeats);
router.get("/check/:movieId", protect, checkBooking);

export default router;
