require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logRoutes = require("./routes/logRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://ai-log-analyzer-one.vercel.app", // production frontend
  "https://ai-log-analyzer-1oc2jqvj0-sri-karthikas-projects.vercel.app" // preview deployment
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

// Handle preflight OPTIONS request automatically
app.options("*", cors());

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