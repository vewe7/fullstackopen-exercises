const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }

  return null;
}

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user");

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({ error: "UserId missing or invalid" });
  }

  const blog = new Blog({ ...request.body, user: user._id });
  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({ error: "UserId missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "blog was not found" });
  }
  logger.info(blog.user.toString());
  logger.info(decodedToken.id.toString());


  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: "request UserId does not match blog UserId" });
  }

  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = await Blog.findById(request.params.id);

  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;

  const result = await blog.save();

  response.status(200).json(result);
});

module.exports = blogsRouter;
