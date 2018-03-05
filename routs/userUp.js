const passport = require("passport");
const UsersUp = require("../models/UserSingUp");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UsersSingUp = mongoose.model("UsersUp");

module.exports = app => {
  app.post("/api/sing-up", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    UsersSingUp.find({ email: email }).then(user => {
      if (user.length >= 1) {
        console.log("mail exists");
        return res.status(409).json({
          message: "mail exists"
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new UsersSingUp({
              email: email,
              password: hash
            });
            user
              .save()
              .then(result => {
                res.status(200).json({
                  message: "User created"
                });
                res.send(result)
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
  });

  app.post("/api/log-in", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    UsersSingUp.findOne({ email: email })
      .then(user => {
        if (!user) {
          console.log("Auth fail, mail does't exist");
          return res.status(401).json({
            message: "Auth fail, mail does't exist"
          });
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log("Auth fail");
            return res.status(401).json({
              message: "Auth fail"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: email,
                userID: user._id
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              }
            );
            console.log("Auth successful", token);
            res.send(user);
          }
          if (!result) {
            console.log("Auth fail, wrong password");
            return res.status(200).json({
              message: "Auth fail, wrong password"
            });
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  app.delete("/api/sing-up/:id", (req, res, next) => {
    UsersSingUp.remove({ _id: req.params.id })
      .then(user => {
        console.log("User deleted");
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
};
