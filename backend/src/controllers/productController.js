import ProductModel from "../models/Product.model.js";

import {responseHandler} from "../response/apiResponse.js";
import {HTTP_STATUS} from "../utils/httpStatus.js";

export const addProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
    const {
        name, description, price, discountPrice, countInStock, sku, category,
        brand, sizes, colors, collections, material, images, isFeatured,
        isPublished, tags, dimensions, weight
    } = req.body;

    const existingProduct = await ProductModel.findById(req.params.id);
    if (!existingProduct) {
        return responseHandler(
            res,
            HTTP_STATUS.NOT_FOUND,
            "Update a product",
            false,
            "Product not found"
        );
    } else {
        existingProduct.name = name;
        existingProduct.description = description;
        existingProduct.price = price;
        existingProduct.discountPrice = discountPrice;
        existingProduct.countInStock = countInStock;
        existingProduct.sku = sku;
        existingProduct.category = category;
        existingProduct.brand = brand;
        existingProduct.sizes = sizes;
        existingProduct.colors = colors;
        existingProduct.collections = collections;
        existingProduct.material = material;
        existingProduct.images = images;
        existingProduct.isFeatured = isFeatured;
        existingProduct.isPublished = isPublished;
        existingProduct.tags = tags;
        existingProduct.dimensions = dimensions;
        existingProduct.weight = weight;

        const updatedProduct = await existingProduct.save();
        return responseHandler(
            res,
            HTTP_STATUS.OK,
            "Update a product",
            true,
            "Success",
            updatedProduct);
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
