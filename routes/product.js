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

router.post("/", auth, createProduct);
router.get("/", auth, getProducts);
router.get("/:id", auth, getProductById);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

// GET /api/products/featured
router.get("/featured", getFeaturedProducts);
router.post("/markAsFeatured", markAsFeatured);

// GET /api/products/most-selling
router.get("/most-selling", getMostSellingProducts);

// PUT /api/products/:id/feature (admin only)
router.put("/:id/feature", auth, markAsFeatured);

module.exports = router;  // 👈 this is crucial