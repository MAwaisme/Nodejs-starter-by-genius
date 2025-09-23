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

// ✅ Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Find user
        let user = await User.findById(req.user.id);
        if (!user) return errorResponse(res, "User not found");

        // Check for duplicate email if user tries to update email
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) return errorResponse(res, "Email already in use");
            user.email = email;
        }

        // Update fields if provided
        if (name) user.name = name;

        await user.save();

        const updatedUser = user.toObject();
        delete updatedUser.password; // hide password field

        successResponse(res, updatedUser, "Profile updated successfully");
    } catch (err) {
        errorResponse(res, err.message);
    }
};