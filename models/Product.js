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
  descr: String,
  unavailable: Boolean
});

productSchema.index({ name: "text" });

module.exports = mongoose.model("Product", productSchema);
