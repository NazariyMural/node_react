// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/UserSingUp");
// const Strategy = require("passport-local").Strategy;
// const createDOMPurify = require("dompurify");
// const { JSDOM } = require("jsdom");

// //espasially login with the google
// module.exports = app => {
//   // app.get(
//   //   "/auth/google",
//   //   passport.authenticate("google", {
//   //     scope: ["profile", "email"]
//   //   })
//   // );

//   // //when user pressed login button we are redirecting him tpo the surrveys section
//   // app.get(
//   //   "/auth/google/callback",
//   //   passport.authenticate("google"),
//   //   (req, res) => res.redirect("/account")
//   // );

//   // //log out staff
//   // app.get("/api/logout", (req, res) => {
//   //   req.logout();
//   //   res.redirect("/");
//   // });

//   // //current user information
//   // app.get("/api/current_user", (req, res) => {
//   //   res.send(req.user);
//   // });

//   //password and user name registration goes below

//   app.get("/api/checksession", (req, res) => {
//     console.log(req.user, " current_user");
//     if (req.user) {
//       return res.send(JSON.stringify(req.user));
//     }
//     return res.send(JSON.stringify({}));
//   });

//   app.get("/api/logout", (req, res) => {
//     req.logout();
//     return res.send(JSON.stringify(req.user));
//   });

//   // app.post("/api/sing-up", (req, res, next) => {
//   //   const email = req.body.email;
//   //   const password = req.body.password;

//   //   const newUser = new User({
//   //     email: email,
//   //     username: email
//   //   });

//   //   User.register(newUser, password, (err, user) => {
//   //     // If there's a problem, send back a JSON object with the error
//   //     if (err) {
//   //       return res.send(JSON.stringify({ error: err }));
//   //     }
//   //     // Otherwise, for now, send back a JSON object with the new user's info
//   //     return res.send(JSON.stringify(user));
//   //   });
//   // });

//   app.post("/api/register", async (req, res) => {
//     // First, check and make sure the email doesn't already exist
//     const query = User.findOne({ email: req.body.email });
//     const foundUser = await query.exec();

//     if (foundUser) {
//       return res.send(
//         JSON.stringify({ error: "Email or username already exists" })
//       );
//     }
//     // Create a user object to save, using values from incoming JSON
//     if (!foundUser) {
//       // sanitize data
//       const window = new JSDOM("").window;
//       const DOMPurify = createDOMPurify(window);
//       const sanitizedBody = {
//         username: DOMPurify.sanitize(req.body.username),
//         email: DOMPurify.sanitize(req.body.email),
//         firstName: DOMPurify.sanitize(req.body.firstName),
//         lastName: DOMPurify.sanitize(req.body.lastName),
//         password: req.body.password
//       };

//       const newUser = new User(sanitizedBody);

//       // Save, via Passport's "register" method, the user
//       return User.register(newUser, req.body.password, err => {
//         // If there's a problem, send back a JSON object with the error
//         if (err) {
//           return res.send(JSON.stringify({ error: err.message }));
//         }
//         // Otherwise log them in
//         return passport.authenticate("local")(req, res, () => {
//           // If logged in, we should have user info to send back
//           if (req.user) {
//             return res.send(JSON.stringify(req.user));
//           }
//           // Otherwise return an error
//           return res.send(
//             JSON.stringify({ error: "There was an error registering the user" })
//           );
//         });
//       });
//     }

//     // return an error if all else fails
//     return res.send(
//       JSON.stringify({ error: "There was an error registering the user" })
//     );
//   });

//   app.post("/api/login", async (req, res) => {
//     // look up the user by their email
//     const query = User.findOne({ email: req.body.email });
//     const foundUser = await query.exec();

//     // if they exist, they'll have a username, so add that to our body
//     if (foundUser) {
//       req.body.username = foundUser.username;
//     }

//     passport.authenticate("local")(req, res, () => {
//       // If logged in, we should have user info to send back
//       if (req.user) {
//         return res.send(JSON.stringify(req.user));
//       }

//       // Otherwise return an error
//       return res.send(
//         JSON.stringify({ error: "There was an error logging in" })
//       );
//     });
//   });
// };

const appConfig = require("../config.js");
const crypto = require("crypto");
const createDOMPurify = require("dompurify");
const express = require("express");
const { JSDOM } = require("jsdom");

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
  "/auth/google",
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
