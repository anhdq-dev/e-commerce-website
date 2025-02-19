import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";

// Middle to protect routes
export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await UserModel.findById(decoded.user.id).select("-password");
            next();
        } catch (error) {
            console.log("Token verification failed:", error);
            res.status(401).json({
                message: "Not authorized, token failed!"
            });
        }
    } else {
        res.status(401).json({
            message: "Not authorized, No token provided"
        });
    }
};