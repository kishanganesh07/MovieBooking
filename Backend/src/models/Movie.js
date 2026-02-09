import mongoose from "mongoose";

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

    runtime: Number
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
