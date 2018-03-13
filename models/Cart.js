const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userID: String,
  userCart: Object,
  userPurchase: Array
});

module.exports = mongoose.model("Cart", cartSchema);
