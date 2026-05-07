const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }]
}, {
  collection: "students"
});

module.exports = mongoose.model("Student", studentSchema);
