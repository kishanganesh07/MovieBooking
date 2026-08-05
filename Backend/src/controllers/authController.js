import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const isProduction = process.env.NODE_ENV === "production";
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: isProduction ? "None" : "Lax",
        secure: isProduction,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .status(201)
      .json({
        message: "Signup successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin || false,
        }
      });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please Provide Email and Password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === "production";
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: isProduction ? "None" : "Lax",
        secure: isProduction,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        }
      });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

const Logout = (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
  });

  res.json({ message: "Logged out successfully" });
};

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: avatar } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if they don't exist
      user = await User.create({
        name,
        email,
        googleId,
        avatar,
        // Optional password because they use Google
      });
    } else if (!user.googleId) {
      // Link Google account to existing email user
      user.googleId = googleId;
      user.avatar = avatar || user.avatar;
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const isProduction = process.env.NODE_ENV === "production";
    res
      .cookie("token", jwtToken, {
        httpOnly: true,
        sameSite: isProduction ? "None" : "Lax",
        secure: isProduction,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({
        message: "Google Login successful",
        token: jwtToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin || false,
          avatar: user.avatar,
        }
      });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to authenticate with Google" });
  }
};

export { SignUp, Login, getProfile, Logout, googleLogin };
