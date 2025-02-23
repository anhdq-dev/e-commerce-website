import express from "express";
import {isAdmin, protect} from "../middlewares/authMiddleware.js";
import {getAllUsers, getProfile, updateUser} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get("/user/profile", protect, getProfile);

userRoutes.get("/", protect, isAdmin, getAllUsers);

userRoutes.put("/user/:id", protect, updateUser);


export default userRoutes;