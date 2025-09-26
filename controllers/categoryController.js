const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const category = await Category.create({
            name,
            createdAt,
            createdBy
        })

        res.status(201).json({ success: true, data: category });
    } catch (error) {
        console.log("error in create category", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.getAllCategry = async (req, res) => {
    try {
        const categories = await Category.find.populate("createdBy");

        res.status(201).json({ status: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}