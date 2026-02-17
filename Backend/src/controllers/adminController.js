import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Movie from "../models/movie.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalRevenueAgg = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalMovies = await Movie.countDocuments();

    const revenuePerMovie = await Booking.aggregate([
      {
        $group: {
          _id: "$movie",
          revenue: { $sum: "$totalPrice" }
        }
      }
    ]);

    res.json({
      totalRevenue,
      totalBookings,
      totalUsers,
      totalMovies,
      revenuePerMovie
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("movie", "title")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    const usersWithBookings = await Promise.all(
      users.map(async (user) => {
        const bookingCount = await Booking.countDocuments({ user: user._id });

        return {
          ...user._doc,
          bookingCount,
        };
      })
    );

    res.json(usersWithBookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
