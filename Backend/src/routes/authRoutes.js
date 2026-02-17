import express from "express";
import { SignUp,Login,getProfile, Logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/profile", protect, getProfile);
export default router;
