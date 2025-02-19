import ProductModel from "../models/Product.model.js";
import UserModel from "../models/User.model.js";

export const addProduct = async (req, res) => {
    try {
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
        const createdProduct = await product.save();
        return res.status(201).json(createdProduct);
    } catch (error) {
        return res.status(500).send(error.message);
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