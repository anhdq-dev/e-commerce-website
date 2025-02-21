import express from "express";
//
import {addProduct, getAllProducts, updateProduct} from "../controllers/productController.js";
import {isAdmin, protect} from "../middlewares/authMiddleware.js";

const productRoutes = express.Router();

// @route POST: /api/v1/products/product
// @desc Create a new product
// @access Private/admin
productRoutes.post("/product", protect, isAdmin, addProduct);

// @route PUT: /api/v1/products/product/:id
// @desc Update an existing product
// @access Private/admin
productRoutes.put("/product/:id", protect, isAdmin, updateProduct);

productRoutes.get("/", getAllProducts);



export default productRoutes;