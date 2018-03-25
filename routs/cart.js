const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const mongoose = require("mongoose");
const Products = require("../models/Product");
const map = require("lodash/map");
const moment = require("moment");

function CartClass(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };
  this.reduceByOne = function(id) {
    this.items[id].qty--;
    this.items[id].price -= this.items[id].item.price;
    this.totalQty--;
    this.totalPrice -= this.items[id].item.price;

    if (this.items[id].qty <= 0) {
      delete this.items[id];
    }
  };
  this.deleteItem = function(id) {
    this.totalQty -= this.items[id].qty;
    this.totalPrice -= this.items[id].item.price * this.items[id].qty;
    delete this.items[id];
  };
  this.genetayeArray = function() {
    const arr = [];
    for (const id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
}

router.get("/:id", (req, res, next) => {
  const userID = req.params.id;
  Cart.findOne({ userID: userID })
    .then(data => res.send(data))
    .catch(err => res.send([]));
});

router.post("/add-to-cart/", (req, res, next) => {
  const productId = req.body.productId;
  const userID = req.body.userID;

  Cart.findOne({ userID: userID })
    .then(existingCart => {
      if (existingCart) {
        let cart = new CartClass(existingCart.userCart);

        Products.findById(productId).then(product => {
          cart.add(product, product._id);

          existingCart.set("userCart", cart);
          existingCart.save().then(result => res.status(200).send(result));
        });
      } else {
        new Cart({
          userID: userID,
          userCart: []
        })
          .save()
          .then(cartRes => {
            let cart = new CartClass(cartRes.userCart);

            Products.findById(productId).then(product => {
              cart.add(product, product._id);

              cartRes.set("userCart", cart);
              cartRes.save().then(result => res.send(result));
            });
          });
      }
    })
    .catch(err => {
      res.status(400).send(err);
      console.log("we got an error");
    });
});

router.post("/reduce-by-one/", (req, res, next) => {
  const productId = req.body.productId;
  const userID = req.body.userID;

  Cart.findOne({ userID: userID })
    .then(existingCart => {
      let cart = new CartClass(existingCart.userCart);
      Products.findById(productId).then(product => {
        cart.reduceByOne(product._id);

        existingCart.set("userCart", cart);
        existingCart.save().then(result => res.send(result));
      });
    })
    .catch(err => {
      res.send(err);
      console.log("we got an error");
    });
});

router.post("/delete-item", (req, res, next) => {
  const productId = req.body.productId;
  const userID = req.body.userID;

  Cart.findOne({ userID: userID })
    .then(existingCart => {
      let cart = new CartClass(existingCart.userCart);
      Products.findById(productId).then(product => {
        cart.deleteItem(product._id);
        existingCart.set("userCart", cart);
        existingCart.save().then(result => res.status(200).send(result));
      });
    })
    .catch(err => {
      res.status(400).send(err);
      console.log("we got an error");
    });
});

router.post("/add-to-purchase-history", (req, res) => {
  const products = req.body.products;
  const userID = req.body.userID;
  const totalPrice = req.body.totalPrice;
  const currentTime = moment().format("MMM Do YY, h:mm:ss a");
  const _purchaseId = new mongoose.Types.ObjectId();

  const currentPurchase = {
    [_purchaseId]: {
      currentTime: currentTime,
      products: products,
      totalPrice: totalPrice
    }
  };
  Cart.findOne({ userID: userID })
    .then(cart => {
      cart.userPurchase.push(currentPurchase);
      cart.set("userCart", {
        items: {},
        totalQty: 0,
        totalPrice: 0
      });
      cart.save().then(result => res.send(result));
    })
    .catch(err => {
      res.send(err);
      console.log("we got an error");
    });
});

router.get("/remove-cart/:id", (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  Cart.findOne({ userID: userID })
    .then(cart => {
      console.log(cart);
      cart.remove().then(result => res.send(null));
    })
    .catch(err => res.send([]));
});

module.exports = router;
