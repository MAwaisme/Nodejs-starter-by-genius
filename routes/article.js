const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createArticle, getArticles } = require("../controllers/articleController");


// ✅ Create a new article
// POST /api/articles
router.post("/", auth, createArticle);
// ✅ Get all articles
// GET /api/articles
router.get("/", getArticles);

module.exports = router;
