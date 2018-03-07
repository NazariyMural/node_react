const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  fullName: String,
  emails: Array,
  photos: Array,
  address: String,
  phone: Number,
  creditCard: Object,
  location: Object
});

// mongoose.model("users", userSchema);
