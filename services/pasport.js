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
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(refreshToken, "refreshToken")
      // console.log(accessToken, "accessToken")
      // console.log(profile, "profile");
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        googleId: profile.id,
        name: profile.displayName,
        emails: [profile.emails],
        photos: [profile.photos]
        // placesLived: [profile._json.placesLived[0].value],
        // raw: [profile._json]
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

// function fetchAlbums() {
// 	fetch("https://rallycoding.herokuapp.com/api/music_albums")
// 		.then(res => res.json())
// 		.then(json => console.log(json));
// }

// fetchAlbums()

//users
// {
//   "_id": {
//       "$oid": "5a8f38c10773ee204c4c7d6b"
//   },
//   "googleId": "112889707649724402783",
//   "name": "Nazariy Mural",
//   "__v": 0
// }
