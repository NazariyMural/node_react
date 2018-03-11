const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userID: String,
  userCart: Object,
  userPurchase: Object
});

module.exports = mongoose.model("Cart", cartSchema);
