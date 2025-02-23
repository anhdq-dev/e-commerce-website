import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {getProfile} from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.get("/profile", protect, getProfile);

// userRoutes.get("/", protect, isAdmin, getAllUsers);
//
// userRoutes.put("/user/:id", protect, updateUser);

export default userRoutes;