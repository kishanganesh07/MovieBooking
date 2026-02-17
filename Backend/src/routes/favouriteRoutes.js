import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  toggleFavourite,
  getFavourites,
} from "../controllers/favouritesController.js";

const router = express.Router();

router.post("/toggle", protect, toggleFavourite);
router.get("/", protect, getFavourites);

export default router;