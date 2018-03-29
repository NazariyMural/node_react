const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");
const _ = require("lodash");

// router.get("/store", (req, res, next) => {
//   Product.find()
//     .then(data => {
//       res.status(200).send(data);
//     })
//     .catch(err => res.send(400).send(err));
// });

router.get("/get-tags", (req, response, next) => {
  Product.find({}, { tags: 1, _id: 0 }).then(tags => {
    response.send(tags);
  });
});

router.get("/get-names", (req, response, next) => {
  Product.distinct("name").then(names => {
    console.log("get-tags", names);
    response.send(names);
  });
});

router.get("/:id", async (req, res, next) => {
  const perPage = 5;
  let productData = req.params.id.split(",");
  let page = 0;
  if (_.isNumber(+productData[0])) {
    page = productData[0];
  }
  console.log(productData);
  //
  let criteria = [];
  let tagsArr = productData.slice(2);
  if (!tagsArr[0]) {
    criteria.push({
      tags: {
        $nin: [""]
      },
      name: {
        $regex: new RegExp(productData[1], "i")
      }
    });
  } else {
    criteria.push({
      tags: {
        $all: tagsArr
      },
      name: {
        $regex: new RegExp(productData[1], "i")
      }
    });
  }

  criteria = criteria.length > 0 ? { $and: criteria } : {};
  console.log(JSON.stringify(criteria));
  const currentAmount = await Product.find(criteria).count();
  let skipFormula = perPage * page - page;
  if (currentAmount < skipFormula) {
    skipFormula = 0;
  }
  const filtered = await Product.find(criteria)
    .skip(skipFormula)
    .limit(perPage);
  res.send({
    product: filtered,
    current: page,
    pages: Math.ceil(currentAmount / perPage),
    count: currentAmount
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
