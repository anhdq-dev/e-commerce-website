import ProductModel from "../model/Product.model.js";
import {responseHandler} from "../response/apiResponse.js";

export const add = async (req, res) => {
    try {
        const requiredFields = ["name", "description", "countInStock", "sku", "price", "category", "sizes", "colors", "collections", "images"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return responseHandler(res, 400, "Add Product", false, `Field: ${field} is required`);
            }
        }

        const productData = {...req.body, user: req.user._id};

        const newProduct = await ProductModel.create(productData);

        return responseHandler(
            res,
            201,
            "Add Product",
            true,
            "Add Product successfully",
            newProduct
        );
    } catch (e) {
        return responseHandler(res, 500, "Add Product", false, e.message);
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const updateFields = req.body;

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateFields, {new: true});

        if (!updatedProduct) {
            return responseHandler(res, 404, "Update Product", false, "Product not found");
        }

        return responseHandler(res, 200, "Update Product", true, "Update Product successfully", updatedProduct);
    } catch (e) {
        return responseHandler(res, 500, "Update Product", false, e.message);
    }
};
