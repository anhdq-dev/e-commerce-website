import UserModel from "../model/User.model.js";
import {responseHandler} from "../response/apiResponse.js";
import jwt from "jsonwebtoken";
import {HTTP_STATUS} from "../utils/httpStatus.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        // registration logic
        let user = await UserModel.findOne({email});
        if (user) {
            return responseHandler(
                res,
                HTTP_STATUS.CONFLICT,
                "Register user",
                false,
                "User already existed!"
            );
        }
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

                return responseHandler(
                    res,
                    HTTP_STATUS.CREATED,
                    "Register user",
                    true,
                    "Success",
                    {
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
        return responseHandler(
            res,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "Register user",
            false,
            error.message
        );
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    let user = await UserModel.findOne({email});
    if (!user) {
        return responseHandler(
            res,
            HTTP_STATUS.NOT_FOUND,
            "Login user",
            false,
            "Invalid Credentials"
        );
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return responseHandler(
            res,
            HTTP_STATUS.UNAUTHORIZED,
            "Login user",
            false,
            "Invalid Credentials"
        );
    }
    // Create JWT Payload
    const payload = {user: {id: user._id, role: user.role}};
    // Sign and return the token along with user data
    jwt.sign(payload,
        process.env.JWT_SECRET,
        {expiresIn: "1d"},
        (error, token) => {
            if (error) throw error;
            // Send the user and token in response
            return responseHandler(
                res,
                HTTP_STATUS.OK,
                "Login user",
                true,
                "Success",
                {
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    },
                    token
                });
        });

};