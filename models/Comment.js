const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
        article: { type: mongoose.Schema.Types.ObjectId, ref: "Article"}
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comments", commentSchema);