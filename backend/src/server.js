import express from "express";
import cors from "cors";
import "dotenv/config";

import {connectDatabase} from "./configs/database.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;


/*==============    API    ================== */
// Authentication API
app.use("/api/v1/auth", authRoutes);

// Product API
app.use("/api/v1/products", productRoutes);

// User API
app.use("/api/v1/users", userRoutes);

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on  http://localhost:${PORT}`);
    });
}).catch(() => {
    console.log("Cannot access database");
});

