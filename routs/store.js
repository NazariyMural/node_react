const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");
// const checkAuth = require("../middleware/check_auth");

router.get("/store", (req, res, next) => {
  Product.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => console.log(err, "router store error"));
});

router.post("/store", (req, res, next) => {
  // const product = new Product({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: "Golf 4",
  //   price: 4400,
  //   weight: 1650,
  //   category: "car",
  //   images: "https://blaaa",
  //   comments: ["1", "2"],
  //   props: { some: "props" },
  //   tags: ["car", "VW"],
  //   descr: "some"
  // })
  // console.log("Successfully post");
  // console.log(pr);
  // const product = new Product(req.body.product)
  const product = new Product(req.body)
    .save()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
