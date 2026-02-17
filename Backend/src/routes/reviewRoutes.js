import express from "express";
import { addReview } from "../controllers/review.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addReview);

export default router;
