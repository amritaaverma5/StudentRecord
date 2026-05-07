const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myAppDB";
const PORT = process.env.PORT || 8000;

mongoose.connect(MONGO_URI)
  .then(() => console.log(`✅ MongoDB connected at ${MONGO_URI}`))
  .catch(err => console.log("❌ Error:", err));

// Routes
app.use("/api", require("./routes"));

// Server
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));