import express from 'express'
import { addMovie, getMovie, getMovieById,bulkAddMovies } from '../controllers/movieController.js'

const router=express.Router()
router.post("/add",addMovie)
router.get("/",getMovie)
router.get('/:id',getMovieById)
router.post("/bulk", bulkAddMovies);

export default router;