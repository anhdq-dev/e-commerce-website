import express from "express";
import {login, register} from "../controllers/authController.js";

const authRoutes = express.Router();

// @route POST: /api/v1/auth/register
// @desc Register a new user
// @access Public
authRoutes.post("/register", register);

// @route POST: /api/v1/auth/login
// @desc Authenticate user
// @access Public
authRoutes.post("/login", login);


export default authRoutes;