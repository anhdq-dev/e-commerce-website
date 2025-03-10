import express from "express";
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getBestSellerProduct,
    getNewArrivalProducts,
    getProductById,
    getSimilarProducts,
    updateProduct
} from "../controller/productController.js";
import {isAdmin, protect} from "../middleware/authMiddleware.js";


const productRoutes = express.Router();

productRoutes.post("/product", protect, isAdmin, addProduct);
productRoutes.put("/product/:id", protect, isAdmin, updateProduct);
productRoutes.delete("/product/:id", protect, isAdmin, deleteProduct);
productRoutes.get("/", getAllProducts);
productRoutes.get("/product/:id", getProductById);
productRoutes.get("/similar/:id", getSimilarProducts);
productRoutes.get("/best-seller", getBestSellerProduct);
productRoutes.get("/new-arrivals", getNewArrivalProducts);


export default productRoutes;