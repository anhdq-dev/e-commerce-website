import Product from "../model/Product.js";
import {responseHandler} from "../response/apiResponse.js";
import {HTTP_STATUS} from "../utils/httpStatus.js";

export const createCart = async (req, res) => {
    const {productId, quantity, size, color, guestId, userId} = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return responseHandler(
                res,
                HTTP_STATUS.NOT_FOUND,
                "Create cart",
                false,
                "Product not found"
            );
        }
    } catch (e) {
        return responseHandler(
            res,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "Create cart",
            false,
            e.message
        );
    }
};
// https://youtu.be/hpgh2BTtac8?si=uXis9YK2txL9wJDN&t=34081