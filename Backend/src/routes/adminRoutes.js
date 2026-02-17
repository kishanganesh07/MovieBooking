import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { getDashboardStats } from "../controllers/adminController.js";
import {getAllBookings} from "../controllers/adminController.js";
import { getAllUsers } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, getDashboardStats);
router.get("/bookings", protect, adminOnly, getAllBookings);
router.get("/users", protect, adminOnly, getAllUsers);


export default router;
