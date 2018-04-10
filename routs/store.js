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
    // console.log("get-tags", names);
    response.send(names);
  });
});

router.get("/:id", async (req, res, next) => {
  const perPage = 4;
  let productData = req.params.id.split(",");
  let page = 1;
  if (_.toNumber(productData[0])) {
    page = _.toNumber(productData[0]);
  } else {
    page = 1;
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
  // console.log("currentAmount", currentAmount);
  // console.log("page", page);
  // let skipFormula = perPage * page - page;
  let skipFormula = (page - 1) * perPage;
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
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: "SHIELD K1",
    price: 350,
    weight: 423,
    category: "tablet",
    images:
      "https://shield.nvidia.com/images/tablet-k1/amazing-games-on-tablet-k1-640-update.png",
    comments: ["New SHIELD tablet K1 for Gamers"],
    props: { some: "props" },
    tags: ["tablet", "android"],
    available: true,
    active: true,
    oldPrice: 350,
    descr:
      "This amazing tablet is powered by the NVIDIA Tegra® K1 processor, which features a 192-core NVIDIA Kepler™ GPU and 2.2 GHz quad-core CPU Get incredible graphics wherever you go by accessing GeForce NOW™ gaming supercomputers in the cloud."
  });
  //   .save()
  //   .then(result => res.status(200).send(result))
  //   .catch(err => res.status(400).send(err));
  // console.log("Successfully post");
  // console.log(pr);
  // const product = new Product(req.body.product);
  // const product = new Product(req.body)
});

module.exports = router;
