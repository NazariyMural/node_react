const expect = require("expect");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/UserSingUp");

let user_samples = [
  {
    googleId: new mongoose.Types.ObjectId(),
    fullName: "User 1",
    email: "some@mail.com",
    username: "some_user_1",
    password: "some"
  },
  {
    googleId: new mongoose.Types.ObjectId(),
    fullName: "User 2",
    email: "some2@mail.com",
    username: "some_user_2",
    password: "some2"
  }
];

beforeEach(done => {
  User.remove({})
    .then(() => {
      return User.insertMany(user_samples);
    })
    .then(() => done());
});

describe("POST /api/auth/register", () => {
  it("should register new user", done => {
    let user_men = {
      googleId: new mongoose.Types.ObjectId(),
      fullName: "User Men",
      email: "some_men@mail.com",
      username: "some_user_men",
      password: "some_men"
    };
    request(app)
      .post("/api/auth/register")
      .send(user_men)
      .expect(200)
      .expect(res => {
        const resUser = JSON.parse(res.text);
        expect(resUser.fullName).toBe(user_men.fullName);
      })
      .end((err, response) => {
        if (err) {
          return done(err);
        }

        User.find({ username: user_men.username })
          .then(user => {
            expect(user.length).toBe(1);
            expect(user[0].email).toBe(user_men.email);
            done();
          })
          .catch(err => done(err));
      });
  });

  it("shouldn't create new user with invalid property", done => {
    request(app)
      .post("/api/auth/register")
      .send({})
      .expect(400)
      .end((err, response) => {
        if (err) {
          return done(err);
        }
        User.find()
          .then(user => {
            expect(user.length).toBe(2);
            done();
          })
          .catch(err => done(err));
      });
  });
});
