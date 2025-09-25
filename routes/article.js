const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createArticle, getArticles, getArticlesById, updateArticle, deleteArticle } = require("../controllers/articleController");


// ✅ Create a new article
// POST /api/articles
router.post("/", auth, createArticle);

// ✅ Get all articles
// GET /api/articles
router.get("/", getArticles);

// ✅ Get single article by ID
// GET /api/articles/:id
router.get("/:id", getArticlesById);

// ✅ Update an article
// PUT /api/articles/:id
router.put("/:id", auth, updateArticle);

// ✅ Delete an article
// DELETE /api/articles/:id
router.delete("/:id", auth, deleteArticle);

module.exports = router;
