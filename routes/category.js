const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createCategory, getAllCategry } = require("../controllers/categoryController");

// POST /api/categories
router.post("/", auth, createCategory);

// GET /api/categories
router.get("/getCategories", getAllCategry)

module.exports = router;