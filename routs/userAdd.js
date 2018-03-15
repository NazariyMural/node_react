const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/UserSingUp");
const multer = require("multer");
const AWS = require("aws-sdk");
const appConfig = require("../config/keys");

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
          user.set("phone", userData.phone);
          user.save().then(result => {
            return res.send(result);
          });
        } else if (userData.hasOwnProperty("creditCard")) {
          user.set("creditCard", userData.creditCard);
          user.save().then(result => res.send(result));
        } else if (userData.hasOwnProperty("fullName")) {
          user.set("fullName", userData.fullName);
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

router.post("/user-add-image", async (req, res) => {
  const file = req.files.file;
  const userID = req.body.userID;
  console.log(req.body.userID);

  let s3bucket = new AWS.S3({
    accessKeyId: appConfig.IAM_USER_KEY,
    secretAccessKey: appConfig.IAM_USER_SECRET,
    Bucket: appConfig.BUCKET_NAME
  });
  s3bucket.createBucket(() => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data,
      ACL: "public-read"
    };
    s3bucket
      .upload(params, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log("success");
      })
      .promise()
      .then(data => {
        console.log(data);
        User.findOne({ googleId: userID }).then(user => {
          user.set("photo", data.Location);
          user.save().then(userResult => res.send(userResult));
        });
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
