import express from "express";
import {add, update} from "../controller/productController.js";
import {isAdmin, protect} from "../middleware/authMiddleware.js";


const productRoutes = express.Router();

productRoutes.post("/product", protect, isAdmin, add);
productRoutes.put("/product/:id", protect, isAdmin, update);


export default productRoutes;