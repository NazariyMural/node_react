const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
    (req, res) => res.redirect("/surveys")
  );

  //log out staff
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //current user information
  app.get("/api/current_user", (req, res) => {
    // res.send(req.session);
    res.send(req.user);
  });
};
