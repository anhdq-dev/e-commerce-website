import express from "express";
import {isAdmin, protect} from "../middlewares/authMiddleware.js";
import {getAllUsers, getProfile, updateUser} from "../controllers/userController.js";

const userRoutes = express.Router();


// @route GET: /api/v1/user/profile
// @desc get logged-in user's profile (Protected Route)
// @access private
userRoutes.get("/user/profile", protect, getProfile);

userRoutes.get("/", protect, isAdmin, getAllUsers);

userRoutes.put("/user/:id", protect, updateUser);


export default userRoutes;