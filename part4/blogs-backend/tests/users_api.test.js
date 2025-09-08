const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const api = supertest(app);

const newUser = {
  username: "auhbuhcuh",
  name: "Buh",
  password: "buhbuhhuh",
};

describe("when there is one user in the db initially", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secwet", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("expected number of users from GET request", async () => {
    const response = await api.get("/api/users");

    assert.strictEqual(response.body.length, 1);
  });

  test("creating user with fresh username is successful", async () => {
    const usersAtStart = await helper.usersInDb();

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    assert(usernames.includes(newUser.username));
  });

  describe("sending a bad request when creating user", async () => {
    test("creating user with existing username returns error", async () => {
      await api
        .post("/api/users")
        .send({ username: "root", password: "admin" })
        .expect(400);
    });

    test("creating user with short username returns error", async () => {
      await api
        .post("/api/users")
        .send({ username: "bu", password: "buh" })
        .expect(400);
    });

    test("creating user with short password returns error", async () => {
      await api
        .post("/api/users")
        .send({ username: "guh", password: "aa" })
        .expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
