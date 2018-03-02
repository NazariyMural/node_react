const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("users");
const multer = require("multer");

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
          } else if (userData.hasOwnProperty("name")) {
            user.set("name", userData.name);
            user.save().then(result => res.send(result));
          }
        }
      })
      .catch(err => console.log(err, "router store error"));
  });

  router.post("/api/user-add-location", (req, res, next) => {
    User.findOne({ googleId: req.body.data.userData.userID })
      .then(user => {
        const userData = req.body.data.userData;
        const location = req.body.data.location;
        user.set("location", { ...location });
        user.save().then(result => res.send(result));
      })
      .catch(err => console.log(err, "router store error"));
  });

  //

  //set storage engine
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./client/src/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => {
    //reqect file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  // //init upload
  const upload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

  router.post("/api/user-add-image", upload.single("file"), (req, res) => {
    console.log(req.file);
    User.findOne({ googleId: req.body.userID })
      .then(user => {
        user.set("photos", [req.file.filename]);
        user.save().then(result => console.log(result));
      })
      .catch(err => console.log(err));
  });

  // router.get("/api/user-add-image", (req, res) => {
  //   User.findOne({ googleId: "112889707649724402783" })
  //     .then(user => {
  //       user.photos[0];
  //       user.save().then(result => res.send(user.photos[0]));
  //     })
  //     .catch(err => console.log(err));
  // });
};

// module.exports = router;
