import Booking from "../models/Booking.js";

const createBooking = async (req, res) => {
  try {
    const { movie, showDate, showTime, seats, totalPrice, transactionId} = req.body;
   
    if (!movie || !showDate || !showTime || !seats?.length) {
      return res.status(400).json({ message: "Missing booking details" });
      
    }
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "User not authorized" });
    }
    const alreadyBooked = await Booking.findOne({
      movie,
      showDate,
      showTime,
      bookedSeats: { $in: seats }
    });


    if (alreadyBooked) {
      return res
        .status(409)
        .json({ message: "One or more seats already booked" });
    }
    const booking = await Booking.create({
      user: userId,
      movie,
      showDate,
      showTime,
      bookedSeats: seats,
      totalPrice,
      transactionId
    });
    res.status(201).json(booking);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getBookedSeats = async (req, res) => {
  try {
    const { movieId, date, time } = req.query;
    const bookings = await Booking.find({
      movie: movieId,
      showDate: date,
      showTime: time,
    });
    const bookedSeats = bookings.reduce((acc, booking) => acc.concat(booking.bookedSeats), []);
    res.json(bookedSeats);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("movie")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("movie")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const checkBooking = async (req, res) => {
  try {
    
    const booking = await Booking.findOne({
       user: req.user._id, 
      movie: req.params.movieId,
    });

    res.json({ hasBooked: !!booking });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
export { createBooking, getBookings, getBookedSeats, getMyBookings, checkBooking };
