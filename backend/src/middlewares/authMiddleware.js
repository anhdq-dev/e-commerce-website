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
            return next();
        } catch (error) {
            console.log("Token verification failed:", error);
            return res.status(401).json({
                message: "Not authorized, token failed!"
            });
        }
    } else {
        return res.status(401).json({
            message: "Not authorized, No token provided"
        });
    }
};

//  Middle to check if the user is an admin
export const isAdmin = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    } else {
        return res.status(403).json({message: "Permission denied"});
    }
};