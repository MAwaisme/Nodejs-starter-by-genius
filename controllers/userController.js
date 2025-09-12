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