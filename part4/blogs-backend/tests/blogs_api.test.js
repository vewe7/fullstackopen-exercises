const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

describe("when some initial blogs have been saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
  });

  test("expected number of notes", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, 2);
  });

  test("unique id property is named 'id'", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      assert.strictEqual(blog.hasOwnProperty("id"), true);
    });
  });

  describe("a new blog is added", () => {
    test("POST req to /api/blogs creates new blog post", async () => {
      const newBlog = {
        _id: "5a422aa71b54a676234d1888",
        title: "supertest",
        author: "John Supertest",
        url: "twitch.tv/northernlion",
        likes: 10,
        __v: 0
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const ids = blogsAtEnd.map(r => r.id);
      assert(ids.includes(newBlog._id));
    });
  });

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

after(async () => {
  await mongoose.connection.close();
});
