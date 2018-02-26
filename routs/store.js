const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");


module.exports = router => {
  router.get("/store", (req, res, next) => {
    Product.find()
      .then(data => {
        console.log(data);
        res.send(data);
      })
      .catch(err => console.log(err, "router store error"));
  });

  router.post("/store", (req, res, next) => {
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
      name: "LG G6",
      price: 320,
      weight: 175,
      category: "Smartphone",
      img: ["https://static.svyaznoy.ru/upload/iblock/ba9/4163630_10.jpg", "https://i1.rozetka.ua/goods/1892331/lg_lgh870ds_acisbk_images_1892331703.jpg"],
      comments: ["A lot og good staff", "One more good comment"]
    });
    product
      .save()
      .then(result => console.log(result))
      .catch(err => console.log(err));
  });
};

// module.exports = router;
