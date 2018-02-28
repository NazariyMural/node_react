const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = mongoose.model("users");

module.exports = router => {
  router.get("/api/user-add", (req, res, next) => {
    User.findOne({ googleId: "112889707649724402783" })
      .then(user => {
        res.send(user);
      })
      .catch(err => console.log(err, "router store error"));
  });

  router.post("/api/user-add", (req, res, next) => {
    User.findOne({ googleId: req.body.userData.userID })
      .then(user => {
        // console.log(req.body.userData.data);

        const userData = req.body.userData;
        for (const key in userData) {
          if (userData.hasOwnProperty("address")) {
            user.set("address", userData.address);
            user.save().then(result => res.send(result));
          } else if (userData.hasOwnProperty("phone")) {
            user.set("phone", userData.phone);
            user.save().then(result => res.send(result));
          } else if (userData.hasOwnProperty("creditCard")) {
            user.set("creditCard", userData.creditCard);
            user.save().then(result => res.send(result));
          }
        }
      })
      .catch(err => console.log(err, "router store error"));
  });
};

// module.exports = router;
