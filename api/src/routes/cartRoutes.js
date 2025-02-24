import express from "express";
import {createCart, deleteCart, updateCart} from "../controller/cartController.js";

const cartRoutes = express.Router();

cartRoutes.post("/create", createCart);
cartRoutes.put("/update", updateCart);
cartRoutes.delete("/delete", deleteCart);


export default cartRoutes;