import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js';
import movieRoutes from './routes/moviesroutes.js'
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";
import cookieParser from "cookie-parser";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import showRoutes from "./routes/showRoutes.js";
const app = express()
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://movie-booking-mauve-two.vercel.app"
    ],
    credentials: true
  })
);

app.use(cookieParser()); app.use(express.json())
app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/shows", showRoutes);

const initializationOfServer = async () => {
  try {
    await connectDb();
    const PORT = process.env.PORT || 3000
    app.listen(PORT, "0.0.0.0", () => console.log(`Server is Running at ${PORT}`))
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}
initializationOfServer();