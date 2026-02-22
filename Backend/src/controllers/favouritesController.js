import User from "../models/User.js";

const toggleFavourite = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(400).json({ message: "Movie ID required" });
    }

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFavourite = user.favourites && user.favourites.some(
      (fav) => fav.toString() === movieId
    );

    if (isFavourite) {
      user = await User.findByIdAndUpdate(
        userId,
        { $pull: { favourites: movieId } },
        { new: true }
      );
    } else {
      user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { favourites: movieId } },
        { new: true }
      );
    }

    res.status(200).json({
      message: isFavourite ? "Removed from favourites" : "Added to favourites",
      favourites: user.favourites,
    });

  } catch (error) {
    console.error("Toggle Favourite Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getFavourites = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    const user = await User.findById(userId).populate("favourites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.favourites || []);
  } catch (error) {
    console.error("Get Favourites Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export { toggleFavourite, getFavourites };
