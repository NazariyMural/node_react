const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  fullName: String,
  email: Array,
  photo: Array,
  address: String,
  phone: Number,
  creditCard: Object,
  location: Object,
  username: Array
});

// mongoose.model("users", userSchema);
