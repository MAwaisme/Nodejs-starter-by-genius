const Article = require('../models/Article');

// Create new article
exports.createArticle = async (req, res) => {
    try {
        console.log("req logggg", req?.body);

        const { title, slug, description, author } = req?.body;

        const article = await Article.create({
            title,
            slug,
            description,
            author,               // string from request
            writerName: req.user._id  // logged-in user from JWT
        });

        res.status(200).json({ success: true, data: article });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all articles
exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate("writerName", "name email"); // populate user details
        res.json({ success: true, data: articles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single article by ID
exports.getArticlesById = async (req, res) => {
    try {
        console.log(req.params.id, "getArticleByIds");

        const articleById = await Article.findById(req?.params.id).populate("writerName", "name email");
        if (!articleById) return res.status(404).json({ success: false, message: "Article not found" });

        res.json(({ success: true, data: articleById }));
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update article
exports.updateArticle = async (req, res) => {
    try {
        const { title, slug, description, author } = req.body;

        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            { title, slug, description, author },
            { new: true, runValidators: true }
        );

        if (!updatedArticle) {
            return res.status(404).json({ success: false, message: "Article not found" });
        }

        res.json({ success: true, data: updatedArticle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete article
exports.deleteArticle = async (req, res) => {
    try {
        const deleteArticleById = await Article.findByIdAndDelete(req.params.id);
        if (!deleteArticleById) return res.status(404).json({ success: false, message: "Article not found" });

        res.json({ success: true, message: "Article deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}