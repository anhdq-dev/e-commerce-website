import express from "express";
import cors from "cors";
import "dotenv/config";
import {connectDatabase} from "./config/database.js";


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9000;


app.get("/", (req, res) => {
    res.send("Welcome to rabbit app");
});

connectDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
});