import mongoose from "mongoose";
import ComingSoonMovie from "../models/ComingSoonMovie.js";

const addMovie = async (req, res) => {
    try {
        const movie = await ComingSoonMovie.create(req.body);
        res.status(201).json("Coming Soon Movie Added Successfully");
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const getMovies = async (req, res) => {
    try {
        const movies = await ComingSoonMovie.find().sort({ release_date: 1 });
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

        const saved = await ComingSoonMovie.insertMany(movies);

        res.status(201).json({
            message: "Coming Soon Movies inserted successfully",
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
        const movie = await ComingSoonMovie.findById(req.params.id)
            .populate("reviews.user", "name");
        if (!movie) {
            return res.status(404).json({ message: "Coming Soon Movie not found" });
        }
        res.json(movie);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid movie ID format" });
        }

        const movie = await ComingSoonMovie.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!movie) {
            return res.status(404).json({ message: "Coming Soon Movie not found" });
        }

        res.json({ message: "Coming Soon Movie updated successfully", movie });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export { addMovie, getMovies, getMovieById, bulkAddMovies, updateMovie };
