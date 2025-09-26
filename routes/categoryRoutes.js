// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createCategory, getCategories } = require("../controllers/categoryController");

router.post("/", auth, createCategory); // POST /api/categories
router.get("/getCategories", getCategories);         // GET /api/categories

module.exports = router;