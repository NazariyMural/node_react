const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const mongoose = require("mongoose");
const Products = require("../models/Product");

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

  // 5a92c284a5228d2c4caaa4fd
  // 112889707649724402783

  Cart.findOne({ userID: userID })
    .then(existingCart => {
      if (existingCart) {
        let cart = new CartClass(existingCart.userCart);

        Products.findById(productId).then(product => {
          cart.add(product, product._id);

          existingCart.set("userCart", cart);
          existingCart.save().then(result => res.send(result));
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
      res.send(err);
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
        existingCart.save().then(result => res.send(result));
      });
    })
    .catch(err => {
      res.send(err);
      console.log("we got an error");
    });
});

module.exports = router;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// router.get("/api/cart/:userId", (req, res, next) => {
//   const id = req.params.userId;

//   Cart.findOne({ userID: id })
//     .then(cart => res.send(cart))
//     .catch(err => console.log(err));
// });

// router.post("/api/cart", (req, res, next) => {
//   const productID = req.body.purchaseData.productID;
//   const userID = req.body.purchaseData.userID;
//   const photoURL = req.body.purchaseData.photoURL;
//   const price = req.body.purchaseData.price;
//   const name = req.body.purchaseData.name;

//   const idArr = [];
//   idArr.push(productID);
//   Cart.findOne({ userID: userID }).then(existingCart => {
//     if (existingCart) {
//       existingCart.productsID.push(productID);
//       existingCart.save();
//     } else {
//       const cart = new Cart({
//         userID: userID,
//         productsID: idArr
//       });
//       cart
//         .save()
//         .then(result => res.send(result))
//         .catch(err => console.log(err));
//     }
//   });
// });

// router.post("/api/cart/increase", (req, res, next) => {
//   const productID = req.body.increaseData.id;
//   const userID = req.body.increaseData.userID;
//   const idArr = [];
//   idArr.push(productID);
//   Cart.findOne({ userID: userID }).then(existingCart => {
//     existingCart.productsID.push(productID);
//     existingCart
//       .save()
//       .then(result => res.send(result))
//       .catch(err => console.log(err));
//   });
// });

// router.post("/api/cart/delete", (req, res, next) => {
//   const productID = req.body.delData.id;
//   const userID = req.body.delData.userID;
//   Cart.findOne({ userID: userID }).then(existingCart => {
//     let filtered = existingCart.productsID.filter(el => {
//       if (el !== productID) {
//         return el;
//       }
//     });
//     existingCart.productsID = filtered;
//     existingCart
//       .save()
//       .then(result => res.send(result))
//       .catch(err => console.log(err));
//   });
// });

// router.post("/api/cart/decrease", (req, res, next) => {
//   const productID = req.body.decreaseData.id;
//   const userID = req.body.decreaseData.userID;
//   Cart.findOne({ userID: userID }).then(existingCart => {
//     existingCart.productsID.splice(productID, 1);
//     existingCart
//       .save()
//       .then(result => res.send(result))
//       .catch(err => console.log(err));
//   });
// });
