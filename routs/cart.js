const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const mongoose = require("mongoose");
const Products = require("../models/Product");
const { map, filter, isEmpty, reduce } = require("lodash");
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

  this.getData = function() {
    return oldCart.items;
  };
}

router.get("/:id", (req, res) => {
  const userID = req.params.id;
  Cart.findOne({ userID: userID })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => res.send([]));
});

router.post("/add-to-cart/", (req, res) => {
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
              cartRes.save().then(result => res.status(200).send(result));
            });
          });
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.put("/reduce-by-one/", (req, res) => {
  const productId = req.body.productId;
  const userID = req.body.userID;
  Cart.findOne({ userID: userID })
    .then(existingCart => {
      console.log(existingCart.userCart);
      let cart = new CartClass(existingCart.userCart);
      Products.findById(productId).then(product => {
        cart.reduceByOne(product._id);

        existingCart.set("userCart", cart);
        existingCart.save().then(result => res.status(200).send(result));
      });
    })
    .catch(err => {
      res.status(400).send(err);
      console.log("we got an error");
    });
});

router.delete("/delete-item/:data", (req, res) => {
  const productData = req.params.data.split("&");
  const productId = productData[0];
  const userID = productData[1];

  Cart.findOne({ userID: userID })
    .then(existingCart => {
      let cart = new CartClass(existingCart.userCart);
      cart.deleteItem(productId);
      existingCart.set("userCart", cart);
      existingCart.save().then(result => res.status(200).send(result));
    })
    .catch(err => {
      res.status(400).send(err);
      console.log("we got an error");
    });
});

router.post("/add-to-purchase-history", async (req, res) => {
  try {
    const products = req.body.products;
    const userID = req.body.userID;
    const link = req.body.link;
    const currentTime = moment().format("MMM Do YY, h:mm:ss a");
    const _purchaseId = new mongoose.Types.ObjectId();

    const keys = Object.keys(products);

    const cart = await Cart.findOne({ userID: userID });
    const data = await Products.distinct("_id", {
      $and: [{ _id: { $in: keys } }, { active: true }]
    });
    const arrOfIds = data.map(el => el.toString());
    const newFiltered = filter(products, (product, key) => {
      if (arrOfIds.includes(key)) {
        return product;
      }
    });
    if (!isEmpty(newFiltered)) {
      const totalprice = reduce(
        newFiltered,
        (acc, product) => acc + product.price,
        0
      );
      const currentPurchase = {
        [_purchaseId]: {
          newFiltered,
          totalPrice: totalprice,
          link,
          currentTime
        }
      };
      await cart.userPurchase.push(currentPurchase);
      await cart.set("userCart", {
        items: {},
        totalQty: 0,
        totalPrice: 0
      });
      const result = await cart.save();
      if (keys.length === arrOfIds.length) {
        //there wern't any changes
        return res.send({ result, message: null });
      } else {
        //some product wasn't add
        return res.send({
          result,
          message:
            "Some products weren't add to the Purchase list, because some of them have been deleted from store"
        });
      }
    }
    //all products were deleted
    await cart.set("userCart", {
      items: {},
      totalQty: 0,
      totalPrice: 0
    });
    const result = await cart.save();
    return res.send({
      result,
      message:
        "Products weren't add to the Purchase list, because they have been deleted from store"
    });
  } catch (err) {
    console.log(err);
    return res.send([]);
  }
});

router.get("/remove-cart/:id", (req, res) => {
  const userID = req.params.id;
  Cart.findOne({ userID: userID })
    .then(cart => {
      cart.remove().then(result => res.send(null));
    })
    .catch(err => res.send([]));
});

router.get("/check-price/:id", async (req, res) => {
  const userID = req.params.id;
  const cart = await Cart.findOne({ userID: userID });
  const arrOfOds = Object.keys(cart.userCart.items);
  const products = await Products.find({
    $and: [{ _id: { $in: arrOfOds } }]
  });
  let totalPrice = 0;
  map(cart.userCart.items, (item, key) => {
    map(products, product => {
      if (`${product._id}` === `${item.item._id}`) {
        cart.userCart.items[product._id].item.price = product.price;
        cart.userCart.items[product._id].price =
          product.price * cart.userCart.items[product._id].qty;
        totalPrice += cart.userCart.items[product._id].price;
      }
    });
  });
  cart.userCart.totalPrice = totalPrice;
  const query = { userID: userID };
  const update = { $set: { userCart: cart.userCart } };
  const options = { new: true };
  const upd = await Cart.findOneAndUpdate(query, update, options, (err, doc) =>
    res.status(200).send(doc)
  );
});

module.exports = { router, CartClass };
