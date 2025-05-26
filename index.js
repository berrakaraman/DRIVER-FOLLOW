//index.js
const express = require("express");
//const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./models/database");
dotenv.config();
const app = express();
// CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

database
  .connector()
  .then(() => {
    console.log("MongoDB bağlantısı başarılı.");
    app.listen(5001, () => {
      console.log("Server started at port 5001");
    });
  })
  .catch((err) => {
    console.error("MongoDB bağlantı hatası:", err);
  });
// Routes
const routes = require("./routes/indexR");
app.use("/api", routes);
