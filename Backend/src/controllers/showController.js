import Show from "../models/Show.js";
export const createShow = async (req, res) => {
  try {
    const { movie, showDateTime, showPrice } = req.body;

    if (!movie || !showDateTime || !showPrice) {
      return res.status(400).json({ message: "All fields required" });
    }

    const show = await Show.create({
      movie,
      showDateTime,
      showPrice,
    });

    res.status(201).json(show);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find()
      .populate("movie", "title poster_path");

    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndDelete(req.params.id);

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.json({ message: "Show deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
