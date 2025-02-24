import Product from "../model/Product.js";
import {responseHandler} from "../response/apiResponse.js";

export const addProduct = async (req, res) => {
    try {
        const requiredFields = ["name", "description", "countInStock", "sku", "price", "category", "sizes", "colors", "collections", "images"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return responseHandler(res, 400, "Add Product", false, `Field: ${field} is required`);
            }
        }

        const productData = {...req.body, user: req.user._id};

        const newProduct = await Product.create(productData);

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

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updateFields = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {new: true});

        if (!updatedProduct) {
            return responseHandler(res, 404, "Update Product", false, "Product not found");
        }

        return responseHandler(res, 200, "Update Product", true, "Update Product successfully", updatedProduct);
    } catch (e) {
        return responseHandler(res, 500, "Update Product", false, e.message);
    }
};

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return responseHandler(
                res,
                404,
                "Delete Product",
                false,
                "Product not found"
            );
        }
        return responseHandler(
            res,
            200,
            "Delete Product",
            true,
            "Delete Product successfully"
        );
    } catch (e) {
        return responseHandler(
            res,
            500,
            "Delete Product",
            false,
            e.message
        );
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const {
            collection, size, color, gender, minPrice,
            maxPrice, sortBy, search, category,
            material, brand, limit
        } = req.query;
        let query = {};
        let sort = {};
        // Filter logic
        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection;
        }
        if (color) {
            query.colors = {$in: [color]};
        }
        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }
        if (material) {
            query.material = {$in: material.split(",")};
        }
        if (brand) {
            query.brand = {$in: brand.split(",")};
        }
        if (size) {
            query.sizes = {$in: size.split(",")};
        }
        if (gender) {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }
        if (search) {
            query.$or = [
                {name: {$regex: search, $options: "i"}},
                {description: {$regex: search, $options: "i"}}
            ];
        }
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = {price: 1};
                    break;
                case "priceDesc":
                    sort = {price: -1};
                    break;
                case "popularity":
                    sort = {rating: -1};
                    break;
                default:
                    break;
            }
        }
        let totalProducts = await Product.countDocuments(query);
        let products = await Product
            .find(query)
            .sort(sort)
            .limit(Number(limit) || 0);
        return responseHandler(
            res,
            200,
            "Get All Products",
            true,
            `Total products: ${totalProducts}`,
            products
        );
    } catch (e) {
        return responseHandler(
            res,
            500,
            "Get All Products",
            false,
            e.message
        );
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            return responseHandler(res, 200, "Get Product", true, "Get Product successfully", product);
        } else {
            return responseHandler(res, 404, "Get Product", false, "Product not found");
        }
    } catch (e) {
        return responseHandler(res, 500, "Get Product", false, e.message);
    }

};

export const getSimilarProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return responseHandler(res, 404, "Get Similar Products", false, "Product not found");
        }
        const similarProducts = await Product.find({
            category: product.category,
            gender: product.gender,
            _id: {$ne: product._id}
        }).limit(4);
        return responseHandler(res, 200, "Get Similar Products", true, "Get Similar Products successfully", similarProducts);
    } catch (e) {
        return responseHandler(res, 500, "Get Similar Products", false, e.message);
    }
};

export const getBestSellerProduct = async (req, res) => {
    try {
        const bestSellerProducts = await Product.find().sort({rating: -1}).limit(8);
        return responseHandler(res, 200, "Get Best Seller Products", true, "Get Best Seller Products successfully", bestSellerProducts);
    } catch (e) {
        return responseHandler(res, 500, "Get Best Seller Products", false, e.message);
    }
};

export const getNewArrivalProducts = async (req, res) => {
    try {
        const newArrivalProducts = await Product.find().sort({createdAt: -1}).limit(8);
        return responseHandler(res, 200, "Get New Arrival Products", true, "Get New Arrival Products successfully", newArrivalProducts);
    } catch (e) {
        return responseHandler(res, 500, "Get New Arrival Products", false, e.message);
    }
};