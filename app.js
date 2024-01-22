const express = require("express");
const app = new express();

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

//Middleware implement
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Databage
// This method is used by Rabbil Vai,
// let URI =
//   "mongodb+srv://<username>:<password>@cluster0.eq5zxrj.mongodb.net/ConceptualProject";
// let OPTION = {
//   user: process.env.MONGODB_USER,
//   pass: process.env.MONGODB_PASS,
//   autoIndex: true,
// };
// mongoose
//   .connect(URI, OPTION)
//   .then((res) => {
//     console.log("database connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//Database
// This method is collcted from mongoose documentation..
async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.eq5zxrj.mongodb.net/ConceptualProject`
  );
  console.log("Database Connected");
}

main().catch((err) => console.log(err));

//Route

// app.use("/api/v1", router);
// Serve static files
app.use(express.static(path.resolve(__dirname, "client-side", "dist")));

//Backend route

// Frontend route define

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client-side", "dist", "index.html"));
});

module.exports = app;
