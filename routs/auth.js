const appConfig = require("../config.js");
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const mongoose = require("mongoose");
// const passport = require("passport");
const User = require("../models/UserSingUp");
const router = express.Router();

router.get("/checksession", (req, res) => {
  if (req.user) {
    return res.send(JSON.stringify(req.user));
  }
  return res.send(JSON.stringify({}));
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.send(JSON.stringify(req.user));
});

router.post("/login", async (req, res) => {
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();
  if (foundUser) {
    req.body.username = foundUser.username;
  }
  passport.authenticate("local")(req, res, () => {
    console.log("authenticate");
    if (req.user) {
      return res.send(JSON.stringify(req.user));
    }
    return res.send(JSON.stringify({ error: "There was an error logging in" }));
  });
});

router.post("/register", async (req, res) => {
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();

  if (foundUser) {
    return res.send(
      JSON.stringify({ error: "Email or username already exists" })
    );
  }
  if (!foundUser) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      fullName: req.body.fullName,
      googleId: new mongoose.Types.ObjectId(),
      password: req.body.password
    });

    return User.register(newUser, req.body.password, err => {
      if (err) {
        return res.status(400).send(JSON.stringify({ error: err.message }));
      }
      return passport.authenticate("local")(req, res, () => {
        if (req.user) {
          return res.status(200).send(JSON.stringify(req.user));
        }
        return res
          .status(400)
          .send(
            JSON.stringify({ error: "There was an error registering the user" })
          );
      });
    });
  }
  return res
    .status(400)
    .send(JSON.stringify({ error: "There was an error registering the user" }));
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  return res.redirect("/account");
});

router.get("/current_user", (req, res) => {
  // res.send(req.session);
  res.send(req.user);
});

module.exports = router;
