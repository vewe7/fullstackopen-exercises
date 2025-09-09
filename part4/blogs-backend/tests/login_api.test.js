const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const api = supertest(app);

describe("when an initial user exists", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secwet", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("login with correct username and password is successful", async () => {
    await api
      .post("/api/login")
      .send({ username: "root", password: "secwet" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

after(async () => {
  await mongoose.connection.close();
});
