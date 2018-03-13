const mongoose = require("mongoose");

const compareSchema = mongoose.Schema({
  userID: String,
  userCompare: Object
});

module.exports = mongoose.model("Compare", compareSchema);
