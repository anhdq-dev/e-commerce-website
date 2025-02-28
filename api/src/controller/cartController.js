import Cart from "../model/Cart.model.js";
import {responseHandler} from "../response/apiResponse.js";
import {HTTP_STATUS} from "../utils/httpStatus.js";
import Product from "../model/Product.js";

// Helper function to get cart by user id or guest id
const getCart = (userId, guestId) => {
    if (userId) {
        return Cart.findOne({user: userId});
    } else if (guestId) {
        return Cart.findOne({guestId});
    } else {
        return null;
    }
};

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
        let cart = await getCart(userId, guestId);
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId
                    && p.size === size
                    && p.color === color
            );
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    quantity,
                    size,
                    color
                });
            }
            cart.totalPrice = cart.products.reduce(
                (accumulator, item) => accumulator + item.price * item.quantity, 0);
            await cart.save();
            return responseHandler(
                res,
                HTTP_STATUS.OK,
                "Create cart",
                true,
                "Cart updated successfully",
                cart
            );
        } else {
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        quantity,
                        size,
                        color
                    }
                ],
                totalPrice: product.price * quantity
            });
            return responseHandler(
                res,
                HTTP_STATUS.CREATED,
                "Create cart",
                true,
                "Cart created successfully",
                newCart
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

export const updateCart = async (req, res) => {
    const {productId, quantity, size, color, guestId, userId} = req.body;

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return responseHandler(
                res,
                HTTP_STATUS.NOT_FOUND,
                "Update cart",
                false,
                "Cart not found"
            );
        }
        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId
                && p.size === size
                && p.color === color
        );

        if (productIndex === -1) {
            // updateQuantity
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);
            }
            cart.totalPrice = cart.products.reduce(
                (accumulator, item) => accumulator + item.price * item.quantity, 0);
            await cart.save();
            return responseHandler(
                res,
                HTTP_STATUS.OK,
                "Update cart",
                true,
                "Cart updated successfully",
                cart
            );
        } else {
            return responseHandler(
                res,
                HTTP_STATUS.NOT_FOUND,
                "Update cart",
                false,
                "Product not found in cart"
            );
        }
    } catch (e) {
        return responseHandler(
            res,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            "Update cart",
            false,
            e.message
        );
    }

};

export const deleteCart = async (req, res) => {
    const {productId, size, color, guestId, userId} = req.body;

    let cart = await getCart(userId, guestId);
    if (!cart) {
        return responseHandler(
            res,
            HTTP_STATUS.NOT_FOUND,
            "Delete cart",
            false,
            "Cart not found"
        );
    }
    const productIndex = cart.products.findIndex(
        (p) =>
            p.productId.toString() === productId
            && p.size === size
            && p.color === color
    );
    if (productIndex > -1) {

        cart.products.splice(productIndex, 1);

        cart.totalPrice = cart.products.reduce(
            (accumulator, item) => accumulator + item.price * item.quantity, 0);
        await cart.save();
        return responseHandler(
            res,
            HTTP_STATUS.OK,
            "Delete cart",
            true,
            "Cart updated successfully",
            cart
        );
    } else {
        return responseHandler(
            res,
            HTTP_STATUS.NOT_FOUND,
            "Delete cart",
            false,
            "Product not found in cart"
        );
    }

};

export const getCartByCustomerId = async (req, res) => {
    const {userId, guestId} = req.query;

    const cart = await getCart(userId, guestId);
    if (cart) {
        return responseHandler(
            res,
            HTTP_STATUS.OK,
            "Get cart",
            true,
            "Get cart by customer id",
            cart
        );
    } else {
        responseHandler(
            res,
            HTTP_STATUS.NOT_FOUND,
            "Get cart",
            false,
            "Cart not found"
        );
    }
};