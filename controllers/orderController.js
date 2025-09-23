// controllers/orderController.js
const Order = require("../models/Order");
const User = require("../models/User");
const { errorResponse } = require("../utils/helpers");

exports.checkout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("cart.product");
        if (!user || !user.cart.length) return errorResponse(res, "Cart is empty");

        const totalPrice = user.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

        const order = await Order.create({
            user: user._id,
            items: user.cart,
            totalPrice
        });

        user.cart = []; // clear cart
        await user.save();

        res.json({ success: true, order });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

exports.getAll = async (req, res) => {
    try {
        const user = await User.find();

        res.json({ success: true, user });
    } catch (err) {
        errorResponse(res, err.message);
    }
};