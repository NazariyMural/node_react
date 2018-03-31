const mongoose = require("mongoose");

const waitListSchema = mongoose.Schema({
  userID: String,
  userWaitList: Array
});

module.exports = mongoose.model("WaitList", waitListSchema);
