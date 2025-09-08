const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

describe("when some initial blogs and a user exist", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secwet", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();

    const blogObjects = helper.initialBlogs.map(blog => new Blog({
      ...blog,
      user: user._id
    }));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
  });

  describe("listing all blogs with GET", () => {

    test("expected number of notes", async () => {
      const response = await api.get("/api/blogs");

      assert.strictEqual(response.body.length, 2);
    });

    test("unique id property is named 'id'", async () => {
      const response = await api.get("/api/blogs");

      response.body.forEach((blog) => {
        assert(blog.hasOwnProperty("id"));
      });
    });

    test("all blogs include creator's user information", async () => {
      const response = await api.get("/api/blogs");

      response.body.forEach((blog) => {
        assert(blog.user);
        assert.strictEqual(blog.user.username, "root");
      });
    });
  });

  describe("a new blog is added", () => {
    const newBlog = {
      _id: "5a422aa71b54a676234d1888",
      title: "supertest",
      author: "John Supertest",
      url: "twitch.tv/northernlion",
      likes: 10,
      __v: 0
    };

    test("POST req to /api/blogs creates new blog post", async () => {
      const blogsAtStart = await helper.blogsInDb();

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);

      const ids = blogsAtEnd.map(r => r.id);
      assert(ids.includes(newBlog._id));
    });

    test("an existing user is assigned when creating new blog", async () => {
      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const user = await User.findById(response.body.user);

      assert(user);
    });
  });

  describe("an existing blog is deleted", () => {
    test("DELETE req to /api/blogs/:id deletes correct blog post", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      const ids = blogsAtEnd.map(r => r.id);
      assert(!ids.includes(blogToDelete.id));

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
    });
  });

  describe("an existing blog is updated", () => {
    test("Adding one like with PUT correctly updates blog", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        user: blogToUpdate.user,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1,
      };

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200);

      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
