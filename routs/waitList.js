const express = require("express");
const router = express.Router();
const WaitList = require("../models/WaitList");
const mongoose = require("mongoose");
const Products = require("../models/Product");
const map = require("lodash/map");
const moment = require("moment");
const cron = require("node-cron");
const User = require("../models/UserSingUp");

const timer = cron.schedule(
  "*/7 * * * * *",
  async () => {
    const lists = await WaitList.find({
      userWaitList: { $elemMatch: { unavailable: false } }
    });
    if (lists.length) {
      const arrayOfIds = [];
      map(lists, (list, key) => {
        // console.log(list.userID);
        arrayOfIds.push(list.userID);
      });
      const users = await User.find({
        $and: [{ googleId: { $in: arrayOfIds } }, { isNotify: { $ne: true } }]
      });
      console.log(
        "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
      );
      console.log(users);
      console.log(
        "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
      );
    }
  },
  false
);
// timer.start();

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


// nodemailer.createTestAccount((err, account) => {
//   var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//              user: 'nazariymurall@gmail.com',
//              pass: 'NAZIK2012'
//          }
//      });

//   let mailOptions = {
//       from: '"Fred Foo 👻" <foo@example.com>', // sender address
//       to: 'nazariymurall@gmail.com, nazik_94@ukr.net', // list of receivers
//       subject: 'Hello ✔', // Subject line
//       text: 'Hello world?', // plain text body
//       html: '<b>Hello world?</b>' // html body
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error);
//       }
//   });
// });

module.exports = router;
