// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");

// router.get("/:id", (req, res, next) => {
//   const userID = req.params.id;
//   Cart.findOne({ userID: userID })
//     .then(data => res.send(data))
//     .catch(err => res.send([]));
// });

// router.post("/add-to-purch-history/", (req, res, next) => {
//   Cart.findOne({ userID: userID })
//     .then(existingCart => {
//       if (existingCart) {
//         let cart = new CartClass(existingCart.userCart);

//         Products.findById(productId).then(product => {
//           cart.add(product, product._id);

//           existingCart.set("userCart", cart);
//           existingCart.save().then(result => res.send(result));
//         });
//       } else {
//         new Cart({
//           userID: userID,
//           userCart: []
//         })
//           .save()
//           .then(cartRes => {
//             let cart = new CartClass(cartRes.userCart);

//             Products.findById(productId).then(product => {
//               cart.add(product, product._id);

//               cartRes.set("userCart", cart);
//               cartRes.save().then(result => res.send(result));
//             });
//           });
//       }
//     })
//     .catch(err => {
//       res.send(err);
//       console.log("we got an error");
//     });
// });

// router.post("/reduce-by-one/", (req, res, next) => {
//   const productId = req.body.productId;
//   const userID = req.body.userID;

//   Cart.findOne({ userID: userID })
//     .then(existingCart => {
//       let cart = new CartClass(existingCart.userCart);
//       Products.findById(productId).then(product => {
//         cart.reduceByOne(product._id);

//         existingCart.set("userCart", cart);
//         existingCart.save().then(result => res.send(result));
//       });
//     })
//     .catch(err => {
//       res.send(err);
//       console.log("we got an error");
//     });
// });

// router.post("/delete-item", (req, res, next) => {
//   const productId = req.body.productId;
//   const userID = req.body.userID;

//   Cart.findOne({ userID: userID })
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

// module.exports = router;
