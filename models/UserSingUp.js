const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserUp = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  // password: { type: String, select: false },
  googleId: String,
  username: String,
  fullName: String,
  phone: Number,
  creditCard: Object,
  location: Object,
  photo: String,
  isLoggedIn: Boolean
});

UserUp.plugin(passportLocalMongoose);

module.exports = mongoose.model("UserUp", UserUp);
