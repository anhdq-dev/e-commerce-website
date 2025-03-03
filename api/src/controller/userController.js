import User from "../model/User.js";
import {responseHandler} from "../response/apiResponse.js";
import {HTTP_STATUS} from "../utils/httpStatus.js";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return responseHandler(
                res,
                HTTP_STATUS.NOT_FOUND,
                "Get Profile",
                false,
                "User not found!"
            );
        }
        return responseHandler(
            res,
            HTTP_STATUS.OK,
            "Get Profile",
            true,
            "Success",
            user
        );
    } catch (error) {
        return responseHandler(
            res,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "Get Profile",
            false,
            error.message
        );
    }
};