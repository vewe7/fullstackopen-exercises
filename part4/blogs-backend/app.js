const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");

const app = express();

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((err) => {
    logger.error("error connecting to MongoDB:", err.message);
  });

app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
