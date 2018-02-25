const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  weight: Number,
  category: String,
  img: Array,
  comments: Array
});

module.exports = mongoose.model("Product", productSchema);
