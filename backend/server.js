require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logRoutes = require("./routes/logRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-log-analyzer-one.vercel.app",
  "https://ai-log-analyzer-1oc2jqvj0-sri-karthikas-projects.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman, etc.
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS not allowed"), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
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