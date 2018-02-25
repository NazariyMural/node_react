const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Product.find()
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => console.log(err, "router store error"));
});

router.post("/", (req, res, next) => {
  // const product = new Product({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: req.body.name,
  //   price: req.body.price,
  //   weight: req.body.weight,
  //   category: req.body.category,
  //   img: req.body.img,
  //   comments: req.body.comments
  // });
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: "Google Pixel",
    price: 360,
    weight: 160,
    category: "Smartphone",
    img: ["https://goo.gl/images/c8tuut", "https://goo.gl/images/dJSgx6"],
    comments: ["Here you can see some good comments"]
  });
  product
    .save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
});

module.exports = router;
