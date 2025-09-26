const Category = require("../models/Category");

// Create category
exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create({
            name: req.body.name,
            createdBy: req.user._id
        });
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllCategry = async (req, res) => {
    try {
        const categories = await Category.find.populate("createdBy");

        res.status(201).json({ status: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};