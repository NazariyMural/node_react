const express = require("express");
const router = express.Router();
const WaitList = require("../models/WaitList");
const mongoose = require("mongoose");
const Products = require("../models/Product");
const map = require("lodash/map");
const moment = require("moment");
const cron = require("node-cron");
const User = require("../models/UserSingUp");
const mailSender = require("../helpers/mailSender");

const timer = cron.schedule(
  "*/5 * * * *",
  async () => {
    try {
      const lists = await WaitList.find({
        userWaitList: { $elemMatch: { available: true } }
      });
      if (lists.length) {
        const arrayOfIds = [];
        map(lists, (list, key) => {
          arrayOfIds.push(list.userID);
        });
        const users = await User.find({
          $and: [{ googleId: { $in: arrayOfIds } }, { isNotify: { $ne: true } }]
        });
        if (users.length) {
          const arrayOfEmails = map(users, user => user.email);
          console.log(arrayOfEmails);

          await User.updateMany(
            {
              $and: [
                { googleId: { $in: arrayOfIds } },
                { isNotify: { $ne: true } }
              ]
            },
            { $set: { isNotify: true } }
          );

          const subject = "Product is available now✔";
          mailSender(arrayOfEmails, subject);
        }
      }
    } catch (error) {
      res.send(error);
    }
  },
  false
);
timer.start();

router.get("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const waitList = await WaitList.findOne({ userID });
    res.status(200).send(waitList);
  } catch (error) {
    res.send(error);
  }
});

router.put("/add", async (req, res) => {
  try {
    const userID = req.body.userID;
    const productId = req.body.productId;

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
      const query = { userID: userID };
      const update = { $addToSet: { userWaitList: product } };
      const options = { new: true };
      WaitList.findOneAndUpdate(query, update, options, (err, doc) =>
        res.status(200).send(doc)
      );
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/remove/:data", async (req, res) => {
  try {
    let productsData = req.params.data.split("&");
    const userID = productsData[0];
    const productName = productsData[1];
    const productDescr = productsData[2];

    console.log(productDescr, productName);
    const query = { userID: userID };
    const update = {
      $pull: {
        userWaitList: { name: productName, descr: productDescr }
      }
    };
    const options = { new: true };
    WaitList.findOneAndUpdate(query, update, options, (err, doc) => {
      console.log(err);
      // console.log(doc);
      return res.status(200).send(doc);
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
