// controllers/cartController.js
const User = require("../models/User");
const Product = require("../models/Product");
const { errorResponse } = require("../utils/helpers");
const Order = require("../models/Order");

// ✅ Add to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = req.user; // 👈 from middleware

        const product = await Product.findById(productId);
        if (!product) return errorResponse(res, "Product not found");

        const cartItem = user.cart.find(item => item.product.toString() === productId);
        if (cartItem) {
            cartItem.quantity += quantity || 1;
        } else {
            user.cart.push({ product: productId, quantity: quantity || 1 });
        }

        await user.save();
        res.json({ success: true, cart: user.cart, user });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// ✅ Get Cart
exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("cart.product"); // ✅ use req.user._id
        res.json({ success: true, cart: user.cart });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// ✅ Remove from cart
exports.removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.cart = user.cart.filter(item => item.product.toString() !== req.params.productId);
        await user.save();
        res.json({ success: true, cart: user.cart });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// controllers/cartController.js

exports.checkout = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("cart.product");

        if (!user || user.cart.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        // prepare items with price included
        const items = user.cart.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));

        // calculate total
        const totalPrice = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        // create new order
        const order = new Order({
            user: user._id,
            items,
            totalPrice,
            status: "paid",          // 👈 assuming payment successful
            paymentMethod: "COD"     // 👈 or "card" later when payment gateway added
        });

        await order.save();

        // ✅ increase soldCount for each product
        for (const item of user.cart) {
            await Product.findByIdAndUpdate(
                item.product._id,
                { $inc: { soldCount: item.quantity } }
            );
        }

        // ✅ clear cart
        user.cart = [];
        await user.save();

        res.json({ success: true, message: "Checkout successful", order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};
