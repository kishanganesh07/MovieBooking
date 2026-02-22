import express from 'express'
import { addMovie, getMovie, getMovieById, bulkAddMovies, updateMovie } from '../controllers/movieController.js'
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
const router = express.Router()
router.post("/add", protect, adminOnly, addMovie)
router.get("/", protect, getMovie)
router.get('/:id', protect, getMovieById)
router.post("/bulk", protect, adminOnly, bulkAddMovies);
router.put("/:id", protect, adminOnly, updateMovie);

export default router;