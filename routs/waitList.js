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
  console.log(waitList);
  res.status(200).send(waitList);
});

router.put("/add", async (req, res) => {
  const userID = req.body.userID;
  const productId = req.body.productId;
  // const userID = "112889707649724402783";
  // const productId = "5abe96e6f0b90e5cb4c6a20b";

  const product = await Products.findOne({ _id: productId });
  const waitlist = await WaitList.findOne({ userID });
  if (!waitlist) {
    const list = await new WaitList({
      userID,
      userWaitList: []
    }).save();
    const saveRes = await list.userWaitList.addToSet(product);
    const data = await list.save();
    res.status(200).send(data);
  } else {
    const saveRes = await waitlist.userWaitList.addToSet(product);
    const data = await waitlist.save();
    res.status(200).send(data);
  }
});

module.exports = router;
