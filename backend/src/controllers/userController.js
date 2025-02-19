import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        // registration logic
        let user = await UserModel.findOne({email});
        if (user) return res.status(400).json({message: "User already existed"});
        user = new UserModel({name, email, password});
        await user.save();
        // Create JWT Payload
        const payload = {user: {id: user._id, role: user.role}};
        // Sign and return the token along with user data
        jwt.sign(payload,
            process.env.JWT_SECRET,
            {expiresIn: "40h"},
            (error, token) => {

                if (error) throw error;
                // Send the user and token in response
                res.status(201).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
//     Find user by email
    try {
        let user = await UserModel.findOne({email});
        if (!user) return res.status(400).json({message: "Invalid Credentials"});
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({message: "Invalid Credential"});
        // Create JWT Payload
        const payload = {user: {id: user._id, role: user.role}};
        // Sign and return the token along with user data
        jwt.sign(payload,
            process.env.JWT_SECRET,
            {expiresIn: "40h"},
            (error, token) => {
                if (error) throw error;
                // Send the user and token in response
                res.json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};

export const getProfile = async (req, res) => {
    res.send(req.user);
};