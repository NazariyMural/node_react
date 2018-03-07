const appConfig = require("../config.js");
const express = require("express");

const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/UserSingUp");
const router = express.Router();

router.get("/checksession", (req, res) => {
  console.log(req.user, "current_user");
  if (req.user) {
    return res.send(JSON.stringify(req.user));
  }
  return res.send(JSON.stringify({}));
});

router.get("/logout", (req, res) => {
  console.log("logout", req.user);
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
    console.log(req.user);
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
        return res.send(JSON.stringify({ error: err.message }));
      }
      return passport.authenticate("local")(req, res, () => {
        if (req.user) {
          return res.send(JSON.stringify(req.user));
        }
        return res.send(
          JSON.stringify({ error: "There was an error registering the user" })
        );
      });
    });
  }
  return res.send(
    JSON.stringify({ error: "There was an error registering the user" })
  );
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) =>
  res.redirect("/account")
);

//log out staff
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

//current user information
// router.get("/current_user", (req, res) => {
//   res.send(req.user);
// });

module.exports = router;
