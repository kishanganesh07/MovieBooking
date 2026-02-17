import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { createShow, getAllShows,
  deleteShow, } from "../controllers/showController.js";
const router = express.Router();
router.post("/", protect, adminOnly, createShow);
router.delete("/:id", protect, adminOnly, deleteShow);
router.get("/", getAllShows);

export default router;