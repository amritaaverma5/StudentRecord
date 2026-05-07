const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }]
}, {
  collection: "courses"
});

module.exports = mongoose.model("Course", courseSchema);
