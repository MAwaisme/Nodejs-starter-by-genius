const User = require("../models/User");
const { successResponse, errorResponse } = require("../utils/helpers");

// Get profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        successResponse(res, user, "Profile fetched successfully");
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true }
        ).select("-password");

        successResponse(res, updatedUser, "Profile updated successfully");
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// ✅ Add/Remove product from favorites
exports.toggleFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const productId = req.params.productId;

        if (!user) return errorResponse(res, "User not found");
        if (!await Product.findById(productId)) return errorResponse(res, "Product not found");

        const isFavorite = user.favorites.includes(productId);
        if (isFavorite) {
            user.favorites.pull(productId); // remove
        } else {
            user.favorites.push(productId); // add
        }

        await user.save();
        res.json({ success: true, favorites: user.favorites });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// ✅ Get all favorites
exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("favorites");
        res.json({ success: true, favorites: user.favorites });
    } catch (err) {
        errorResponse(res, err.message);
    }
};