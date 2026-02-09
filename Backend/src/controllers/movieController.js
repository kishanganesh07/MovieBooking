import mongoose from "mongoose";
import Movie from "../models/movie.js";
const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json("Movie Added Successfully");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const getMovie = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.json(movies);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const bulkAddMovies = async (req, res) => {
  try {
    const movies = req.body;

    if (!Array.isArray(movies)) {
      return res.status(400).json({ message: "Send array of movies" });
    }

    const saved = await Movie.insertMany(movies);

    res.status(201).json({
      message: "Movies inserted successfully",
      count: saved.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid movie ID format" });
    }
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export { addMovie, getMovie, getMovieById, bulkAddMovies};
