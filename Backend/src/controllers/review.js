import Movie from "../models/movie.js";
import Booking from "../models/Booking.js";

export const addReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;

    const hasBooked = await Booking.findOne({
      user: req.user._id,
      movie: movieId,
    });

    if (!hasBooked) {
      return res.status(403).json({
        message: "You can only review movies you booked",
      });
    }

    const movie = await Movie.findById(movieId);
    const alreadyReviewed = movie.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You already reviewed this movie",
      });
    }

    const review = {
      user: req.user._id,
      rating,
      comment,
    };

    movie.reviews.push(review);
    movie.averageRating =
      movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
      movie.reviews.length;

    await movie.save();

    res.status(201).json({ message: "Review added successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
