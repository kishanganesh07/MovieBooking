import express from 'express'
import { addMovie, getMovies, getMovieById, bulkAddMovies, updateMovie } from '../controllers/comingSoonMovieController.js'
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router()

router.post("/add", protect, adminOnly, addMovie)
router.get("/", getMovies)
router.get('/:id', getMovieById)
router.post("/bulk", protect, adminOnly, bulkAddMovies);
router.put("/:id", protect, adminOnly, updateMovie);

export default router;
