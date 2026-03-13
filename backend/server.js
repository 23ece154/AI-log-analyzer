require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logRoutes = require("./routes/logRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://ai-log-analyzer-one.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

app.use("/api/logs", logRoutes);

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
 console.log("MongoDB connected");
})
.catch((err) => {
 console.log(err);
});

app.listen(5000, () => {
  console.log(`Server running on port 5000`)
});