import ProductModel from "../models/Product.model.js";
import UserModel from "../models/User.model.js";
import {responseHandler} from "../response/apiResponse.js";
import {HTTP_STATUS} from "../utils/httpStatus.js";

export const addProduct = async (req, res) => {
    try {
        const {
            name, description, price, discountPrice, countInStock, category,
            brand, sizes, colors, collections, material, images, isFeatured,
            isPublished, tags, dimensions, weight, sku, gender
        } = req.body;
        const product = new ProductModel({
            name, description, price, discountPrice, countInStock,
            category, brand, sizes, colors, collections,
            material, gender, images, isFeatured, isPublished,
            tags, dimensions, weight, sku, user: req.user._id
        });

        try {
            const createdProduct = await product.save();
            return responseHandler(
                res,
                HTTP_STATUS.CREATED,
                "Create a product",
                true,
                "Success",
                createdProduct
            );
        } catch (error) {
            return responseHandler(
                res,
                HTTP_STATUS.BAD_REQUEST,
                "Create a product",
                false,
                error.message
            );
        }
    } catch (error) {
        return responseHandler(
            res,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "Create a product",
            false,
            error.message
        );
    }

};

export const updateProduct = async (req, res) => {
    const {
        name,
        description,
        price,
        discountPrice,
        countInStock,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        images,
        isFeatured,
        isPublished,
        tags,
        dimensions,
        weight,
        sku,
        gender
    } = req.body;

    const product = new ProductModel({
        name,
        description,
        price,
        discountPrice,
        countInStock,
        category,
        brand,
        sizes,
        colors,
        collections,
        material,
        gender,
        images,
        isFeatured,
        isPublished,
        tags,
        dimensions,
        weight,
        sku,
        user: req.user._id
    });
    const existingProduct = UserModel.findById(req.params.id);
    if (existingProduct) {
        // Update product fields
        existingProduct.name = name;
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        return responseHandler(
            res,
            HTTP_STATUS.OK,
            "Get all products",
            true,
            "Success",
            products
        );
    } catch (error) {
        return responseHandler(
            res,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "Get all products",
            false,
            error.message
        );
    }
};
