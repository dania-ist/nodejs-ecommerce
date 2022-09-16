const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const mountRoutes = require("./routes");

dotenv.config();

const PORT = process.env.PORT || 8000;
// express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

mountRoutes(app);

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log("server is working");
  });
});
