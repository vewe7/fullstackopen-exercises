const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");

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

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);

app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
