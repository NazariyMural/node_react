const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const User = mongoose.model("users");
const User = require("../models/UserSingUp");
const multer = require("multer");

router.get("/user-add", (req, res, next) => {
  User.findOne({ googleId: "112889707649724402783" })
    .then(user => {
      res.send(user);
    })
    .catch(err => console.log(err, "router store error"));
});

router.post("/user-add-change", (req, res, next) => {
  console.log("we are on add");
  User.findOne({ googleId: req.body.userData.userID })
    .then(user => {
      console.log(req.body.userData);

      const userData = req.body.userData;
      for (const key in userData) {
        if (userData.hasOwnProperty("address")) {
          user.set("address", userData.address);
          user.save().then(result => res.send(result));
        } else if (userData.hasOwnProperty("phone")) {
          console.log("phhhhhhhhhhhhhhhhhhhhhhhhhhhhhooooooooooooooooooonnne");
          user.set("phone", userData.phone);
          user.save().then(result => {
            console.log(result, "resssssssssssult");
            return res.send(result);
          });
        } else if (userData.hasOwnProperty("creditCard")) {
          user.set("creditCard", userData.creditCard);
          user.save().then(result => res.send(result));
        } else if (userData.hasOwnProperty("name")) {
          user.set("name", userData.name);
          user.save().then(result => res.send(result));
        }
      }
    })
    .catch(err => console.log(err, "router store error"));
});

router.post("/user-add-location", (req, res, next) => {
  console.log("user-add-location");
  User.findOne({ googleId: req.body.data.userData.userID })
    .then(user => {
      const userData = req.body.data.userData;
      const location = req.body.data.location;
      user.set("location", location);
      user.save().then(result => res.send(result));
    })
    .catch(err => console.log(err, "router store error"));
});

router.post("/user-add-image", (req, res) => {
  User.findOne({ googleId: req.body.userID })
    .then(user => {
      user.set("photos", [req.body.photoURL]);
      user.save().then(result => res.send(result));
    })
    .catch(err => console.log(err));
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// //

//set storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./client/src/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   //reqect file
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// // //init upload
// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });

router.post("/api/user-add-image", (req, res) => {
  console.log(req.file);
});

// router.get("/api/user-add-image", (req, res) => {
//   User.findOne({ googleId: "112889707649724402783" })
//     .then(user => {
//       user.photos[0];
//       user.save().then(result => res.send(user.photos[0]));
//     })
//     .catch(err => console.log(err));
// });

module.exports = router;
