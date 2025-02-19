import express from "express";
import {getProfile, login, register} from "../controllers/userController.js";
import {protect} from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

// @route POST: /api/v1/users/register
// @desc Register a new user
// @access Public
userRoutes.post("/register", register);

// @route POST: /api/v1/users/login
// @desc Authenticate user
// @access Public
userRoutes.post("/login", login);

// @route GET: /api/v1/users/profile
// @desc get logged-in user's profile (Protected Route)
// @access private
userRoutes.get("/profile", protect, getProfile);


export default userRoutes;