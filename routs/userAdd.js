const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const User = mongoose.model("users");
const User = require("../models/UserSingUp");
const multer = require("multer");
const AWS = require("aws-sdk");
const Busboy = require("busboy");

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

const BUCKET_NAME = "nazariymural";
const IAM_USER_KEY = "AKIAJUG2IOXVXPHARW3Q";
const IAM_USER_SECRET = "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";

router.post("/user-add-image", (req, res) => {
  const file = req.files.file;

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
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
        return res.send(data);
      });
  });
});

module.exports = router;
