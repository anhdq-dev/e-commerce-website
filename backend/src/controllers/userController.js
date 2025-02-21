import UserModel from "../models/User.model.js";
import {HTTP_STATUS} from "../utils/httpStatus.js";
import {responseHandler} from "../response/apiResponse.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({role: "customer"});
        return responseHandler(res, HTTP_STATUS.OK, "Get all users", true, "Success", users);
    } catch (error) {
        return responseHandler(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, "Get all users", false, error.message, null);
    }
};

export const getProfile = async (req, res) => {
    return responseHandler(res, HTTP_STATUS.OK, "Get a profile", true, "Success", req.user);
};

export const updateUser = async (req, res) => {
    res.send({
        id: req.params.id,
        data: req.user
    });
};