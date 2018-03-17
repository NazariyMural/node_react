const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  weight: Number,
  category: String,
  images: String,
  comments: Array,
  props: Object,
  tags: Array,
  descr: String
});

module.exports = mongoose.model("Product", productSchema);
