const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  collection: "posts"
});

module.exports = mongoose.model("Post", postSchema);
