const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");
// const checkAuth = require("../middleware/check_auth");

// router.get("/store", (req, res, next) => {
//   Product.find()
//     .then(data => {
//       res.status(200).send(data);
//     })
//     .catch(err => res.send(400).send(err));
// });

router.get("/store", (req, res, next) => {
  const perPage = 5;
  let productData = req.params.id.split(",");
  let resultsPagination = productData[0];
  const page = resultsPagination || 0;

  Product.find({
    name: {
      $regex: new RegExp(productData[1], "i")
    }
  })
    .skip(perPage * page - page)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err);
        res.send({
          product: products,
          current: page,
          pages: Math.ceil(count / perPage),
          count: count
        });
      });
    });
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
