const Article = require('../models/Article');

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

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate("writerName", "name email"); // populate user details
        res.json({ success: true, data: articles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};