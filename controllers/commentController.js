// controllers/comment.controller.js
const Comment = require("../models/Comment");
const Article = require("../models/Article");

// Add a new comment
exports.addComment = async (req, res) => {
    try {
        const { articleId } = req.params;
        const { userId, text } = req.body;
        console.log("user >>>>>>>>>>>>>>>", req.user);


        const article = await Article.findById(articleId);
        if (!article) return res.status(404).json({ message: "Article not found" });

        const comment = new Comment({ text, user: userId, article: articleId });
        await comment.save();

        res.status(201).json({ message: "Comment added", comment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all comments for an article
exports.getComments = async (req, res) => {
    try {
        const { articleId } = req.params;

        const comments = await Comment.find({ article: articleId })
            .populate("user")
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};