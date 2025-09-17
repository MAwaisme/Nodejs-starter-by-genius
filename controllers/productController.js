// controllers/productController.js
const Product = require("../models/Product");
const { errorResponse } = require("../utils/helpers");

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ success: false, message: "Name and price are required" });
        }
        // console.log("req.user================>>>>>>>>>>>", req);

        const product = new Product({
            name,
            price,
            description: description || "",
            createdBy: req.body.id
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.json({ success: true, data: products });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        res.json({ success: true, data: product });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description },
            { new: true, runValidators: true }
        );

        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        res.json({ success: true, message: "Product updated", data: product });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        res.json({ success: true, message: "Product deleted" });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// ✅ Get Featured Products
exports.getFeaturedProducts = async (req, res) => {
    console.log("res-------", req);

    try {
        const products = await Product.find({ isFeatured: true })
            .sort({ createdAt: -1 })
            .limit(10); // limit to 10 featured products

        res.json({ success: true, data: products });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// ✅ Get Most Selling Products
exports.getMostSellingProducts = async (req, res) => {
    console.log("res------- soldCount", req);

    try {
        const products = await Product.find()
            .sort({ soldCount: -1 }) // highest sold first
            .limit(10);

        res.json({ success: true, data: products });
    } catch (err) {
        errorResponse(res, err.message);
    }
};

// ✅ Mark a Product as Featured (Admin use case)
exports.markAsFeatured = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.body.id,
            { isFeatured: req.body.isFeatured },
            { new: true }
        );
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        res.json({ success: true, message: "Product marked as featured", data: product });
    } catch (err) {
        errorResponse(res, err.message);
    }
};