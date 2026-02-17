import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    overview: String,

    poster_path: String,

    backdrop_path: String,

    genres: {
      type: Array
    },
    casts: [
  {
    name: String,
    profile_path: String
  }
],
    release_date: String,

    vote_average: Number,

    runtime: Number,
     reviews: [reviewSchema],
      averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
