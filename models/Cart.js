const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userID: String,
  productsID: Array
  // photoURL: String,
  // price: Number,
  // name: String
});

module.exports = mongoose.model("Cart", cartSchema);
