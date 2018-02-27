const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = router => {
  router.get("/api/cart", (req, res, next) => {
    Cart.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => console.log(err, "router store error"));
  });

  router.get("/api/cart/:userId", (req, res, next) => {
    const id = req.params.userId;

    Cart.findOne({ userID: id })
      .then(cart => res.send(cart))
      .catch(err => console.log(err));
  });

  router.post("/api/cart", (req, res, next) => {
    const productID = req.body.purchaseData.productID;
    const userID = req.body.purchaseData.userID;
    const photoURL = req.body.purchaseData.photoURL;
    const price = req.body.purchaseData.price;
    const name = req.body.purchaseData.name;

    const idArr = [];
    idArr.push(productID);
    Cart.findOne({ userID: userID }).then(existingCart => {
      if (existingCart) {
        existingCart.productsID.push(productID);
        existingCart.save();
      } else {
        const cart = new Cart({
          userID: userID,
          productsID: idArr
        });
        cart
          .save()
          .then(result => res.send(result))
          .catch(err => console.log(err));
      }
    });
  });

  router.post("/api/cart/increase", (req, res, next) => {
    const productID = req.body.increaseData.id;
    const userID = req.body.increaseData.userID;
    const idArr = [];
    idArr.push(productID);
    Cart.findOne({ userID: userID }).then(existingCart => {
      existingCart.productsID.push(productID);
      existingCart
        .save()
        .then(result => res.send(result))
        .catch(err => console.log(err));
    });
  });

  router.post("/api/cart/delete", (req, res, next) => {
    const productID = req.body.increaseData.id;
    const userID = req.body.increaseData.userID;
    const idArr = [];
    idArr.push(productID);
    Cart.findOne({ userID: userID }).then(existingCart => {
      existingCart.productsID.push(productID);
      existingCart
        .save()
        .then(result => res.send(result))
        .catch(err => console.log(err));
    });
  });
};
