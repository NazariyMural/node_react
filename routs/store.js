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
      name: "Samsung S8",
      price: 250,
      weight: 175,
      category: "Smartphone",
      img: [
        "https://static.svyaznoy.ru/upload/iblock/36f45a204b88f7c74724d5474c657587/2.jpg"
      ],
      comments: ["Blahhhsah", "Blabalalalals"]
    });
    // product
    //   .save()
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err));
  });
};

// module.exports = router;
