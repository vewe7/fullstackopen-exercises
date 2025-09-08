const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user");

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const users = await User.find({});
  const blog = new Blog({ ...request.body, user: users[0]._id });

  const result = await blog.save();
  users[0].blogs = users[0].blogs.concat(result._id);
  await users[0].save();

  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
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
