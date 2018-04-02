const express = require("express");
const router = express.Router();
const WaitList = require("../models/WaitList");
const mongoose = require("mongoose");
const Products = require("../models/Product");
const map = require("lodash/map");
const moment = require("moment");

router.get("/:id", async (req, res) => {
  const userID = req.params.id;
  const waitList = await WaitList.findOne({ userID });
  res.status(200).send(waitList);
});

router.put("/add", async (req, res) => {
  const userID = req.body.userID;
  const productId = req.body.productId;

  const product = await Products.findOne({ _id: productId });
  const waitlist = await WaitList.findOne({ userID });
  console.log(userID, productId);
  if (!waitlist) {
    const list = await new WaitList({
      userID,
      userWaitList: []
    }).save();
    const saveRes = await list.userWaitList.addToSet(product);
    const data = await list.save();
    console.log(data);
    res.status(200).send(data);
  } else {
    const query = { userID: userID };
    const update = { $addToSet: { userWaitList: product } };
    const options = { new: true };
    WaitList.findOneAndUpdate(query, update, options, (err, doc) =>
      res.status(200).send(doc)
    );
  }
});

router.delete("/remove/:data", async (req, res) => {
  let productData = req.params.data.split("&");
  const userID = productData[0];
  const productId = productData[1];

  const product = await Products.findOne({ _id: productId });
  const query = { userID: userID };
  const update = { $pull: { userWaitList: { name: "Iphone 10" } } };
  const options = { new: true };
  WaitList.findOneAndUpdate(query, update, options, (err, doc) => {
    return res.status(200).send(doc);
  });
});

module.exports = router;
