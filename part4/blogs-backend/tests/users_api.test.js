const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const api = supertest(app);

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

    const newUser = {
      username: "auhbuhcuh",
      name: "Buh",
      password: "buhbuhhuh",
    };

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
});

after(async () => {
  await mongoose.connection.close();
});
