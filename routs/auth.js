const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/UserSingUp");
const Strategy = require("passport-local").Strategy;

//espasially login with the google
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  //when user pressed login button we are redirecting him tpo the surrveys section
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => res.redirect("/account")
  );

  //log out staff
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //current user information
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.post("/api/sing-up", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
      email: email,
      username: email
    });

    User.register(newUser, password, (err, user) => {
      // If there's a problem, send back a JSON object with the error
      if (err) {
        return res.send(JSON.stringify({ error: err }));
      }
      // Otherwise, for now, send back a JSON object with the new user's info
      return res.send(JSON.stringify(user));
    });
  });

  app.post("/api/login", async (req, res) => {
    console.log(req.body);
    const query = User.findOne({ email: req.body.email });
    const foundUser = await query.exec();

    if (foundUser) {
      req.body.username = foundUser.username;
    }

    passport.authenticate("local")(req, res, () => {
      // If logged in, we should have user info to send back
      if (req.user) {
        return res.send(JSON.stringify(req.user));
      }

      // Otherwise return an error
      return res.send(
        JSON.stringify({ error: "There was an error logging in" })
      );
    });
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    return res.send(JSON.stringify(req.user));
  });
};
