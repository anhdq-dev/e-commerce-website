import express from "express";
import {createCart} from "../controller/cartController.js";

const cartRoutes = express.Router();

cartRoutes.post("/create", createCart);


export default cartRoutes;