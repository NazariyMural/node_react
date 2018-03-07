const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//new GoogleStrategy - створю новий екземпляр від GooglePassportStrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(refreshToken, "refreshToken")
      // console.log(accessToken, "accessToken")
      console.log(profile, "profile");
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        googleId: profile.id,
        fullName: profile.displayName,
        email: [profile.emails],
        photo: [profile.photos],
        username: [profile.emails]
      }).save();
      done(null, user);
    }
    // (accessToken, refreshToken, profile, done) => {
    //   User.findOne({ googleId: profile.id }).then(existingUser => {
    //     if (existingUser) {
    //       //we already have a record with this profile id
    //       done(null, existingUser);
    //     } else {
    //       new User({
    //         googleId: profile.id,
    //         name: profile.displayName
    //       })
    //         .save()
    //         .then(user => done(null, user));
    //     }
    //   });
    // }
  )
);
