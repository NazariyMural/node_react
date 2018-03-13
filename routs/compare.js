const express = require("express");
const router = express.Router();
const Compare = require("../models/Compare");
const mongoose = require("mongoose");
const Products = require("../models/Product");
const map = require("lodash/map");

function CompareClass(oldCompareData) {
  this.items = oldCompareData.items || {};

  this.add = function(item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item: item };
    }
  };
  this.deleteItem = function(id) {
    delete this.items[id];
  };
}

router.get("/:id", (req, res, next) => {
  const userID = req.params.id;
  Compare.findOne({ userID: userID })
    .then(data => res.send(data))
    .catch(err => res.send([]));
});

router.post("/add-to-compare", (req, res, next) => {
  const productId = req.body.productId;
  const userID = req.body.userID;

  console.log(productId);

  Compare.findOne({ userID: userID })
    .then(existingСomparison => {
      if (existingСomparison) {
        let compare = new CompareClass(existingСomparison.userCompare);

        Products.findById(productId).then(product => {
          compare.add(product, product._id);

          existingСomparison.set("userCompare", compare);
          existingСomparison.save().then(result => res.send(result));
        });
      } else {
        new Compare({
          userID: userID,
          userCompare: []
        })
          .save()
          .then(newСomparison => {
            let compare = new CompareClass(newСomparison.userCompare);

            Products.findById(productId).then(product => {
              compare.add(product, product._id);

              newСomparison.set("userCompare", compare);
              newСomparison.save().then(result => res.send(result));
            });
          });
      }
    })
    .catch(err => {
      res.send(err);
      console.log("we got an error", err);
    });
});

// router.post("/delete-item", (req, res, next) => {
//   const productId = req.body.productId;
//   const userID = req.body.userID;

//   Compare.findOne({ userID: userID })
//     .then(existingCart => {
//       let cart = new CartClass(existingCart.userCart);
//       Products.findById(productId).then(product => {
//         cart.deleteItem(product._id);
//         existingCart.set("userCart", cart);
//         existingCart.save().then(result => res.send(result));
//       });
//     })
//     .catch(err => {
//       res.send(err);
//       console.log("we got an error");
//     });
// });

// router.get("/remove-cart/:id", (req, res) => {
//   const userID = req.params.id;
//   console.log(userID);
//   Compare.findOne({ userID: userID })
//     .then(cart => {
//       console.log(cart);
//       cart.remove().then(result => res.send(null));
//     })
//     .catch(err => res.send([]));
// });

module.exports = router;
