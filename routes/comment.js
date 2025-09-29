// routes/comment.routes.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Add a comment to an article
router.post("/:articleId/comments", commentController.addComment);

// Get all comments for an article
router.get("/:articleId/comments", commentController.getComments);

// Delete a comment
router.delete("/comments/:commentId", commentController.deleteComment);

module.exports = router;