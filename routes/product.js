const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    getMostSellingProducts,
    markAsFeatured
} = require("../controllers/productController");

// Create + Read all
router.post("/", auth, createProduct);
router.get("/", auth, getProducts);

// ✅ Fixed routes must come BEFORE dynamic routes
router.get("/featured", getFeaturedProducts);
router.get("/most-selling", getMostSellingProducts);
router.post("/markAsFeatured", markAsFeatured);
router.put("/:id/feature", auth, markAsFeatured);

// Dynamic :id routes at the bottom
router.get("/:id", auth, getProductById);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;