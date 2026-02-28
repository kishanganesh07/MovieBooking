import express from "express";
import { SignUp, Login, getProfile, Logout, googleLogin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", SignUp);
router.post("/login", Login);
router.post("/google", googleLogin);
router.post("/logout", Logout);
router.get("/profile", protect, getProfile);
export default router;
