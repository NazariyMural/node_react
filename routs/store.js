const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");

module.exports = router => {
  router.get("/api/store", (req, res, next) => {
    Product.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => console.log(err, "router store error"));
  });

  router.post("/api/store", (req, res, next) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: "Apple Iphone X",
      price: 310,
      weight: 115,
      category: "Smartphone",
      img: [""],
      comments: ["Blabalalalals", "saa51ca5c5"]
    });
    // product
    //   .save()
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err));
  });
};

// module.exports = router;
