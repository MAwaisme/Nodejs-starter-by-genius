const { successResponse, errorResponse } = require("../utils/helpers");

exports.getDashboard = async (req, res) => {
    try {
        // Example data
        const stats = { users: 120, posts: 45, revenue: 7800 };
        successResponse(res, stats, "Dashboard data fetched successfully");
    } catch (err) {
        errorResponse(res, err.message);
    }
};