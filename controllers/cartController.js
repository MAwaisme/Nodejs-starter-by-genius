// controllers/cartController.js
const User = require("../models/User");
const Product = require("../models/Product");
const { errorResponse } = require("../utils/helpers");

// ✅ Add to cart
exports.addToCart = async (req, res) => {
    console.log("req, res==============>>>>>>>>>>", req, res);

    try {
        const { productId, quantity } = req.body;
        const user = await User.findById(req.user.id); // ✅ use req.user.id
        if (!user) return errorResponse(res, "User not found");

        const product = await Product.findById(productId);
        if (!product) return errorResponse(res, "Product not found");

        const cartItem = user.cart.find(item => item.product.toString() === productId);
        if (cartItem) {
            cartItem.quantity += quantity || 1;
        } else {
            user.cart.push({ product: productId, quantity: quantity || 1 });
        }

        await user.save();
        res.json({ success: true, cart: user.cart });
    } catch (err) {
        console.log("error in add to card=============>>>>>>>", err);

        errorResponse(res, err.message);
    }
};

// ✅ Get Cart
exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("cart.product"); // ✅ use req.user.id
        res.json({ success: true, cart: user.cart });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// ✅ Remove from cart
exports.removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);
        await user.save();
        res.json({ success: true, cart: user.cart });
    } catch (err) {
        errorResponse(res, err.message);
    }
}; 