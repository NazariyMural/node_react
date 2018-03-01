const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userID: String,
  userCart: Object
});

module.exports = mongoose.model("Cart", cartSchema);
