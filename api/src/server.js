import express from "express";
import cors from "cors";
import "dotenv/config";
import {connectDatabase} from "./config/database.js";
//
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3000;
/*============== Routes ============*/
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);


connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on  http://localhost:${PORT}`);
    });
}).catch(() => {
    console.log("Cannot access database");
});
