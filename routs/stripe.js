const mongoose = require("mongoose");
const User = mongoose.model("users");
const Products = require("../models/Product");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = router => {
  router.post("/api/stripe", async (req, res, next) => {
    const charge = await stripe.charges.create({
      amount: req.body.amount / 100,
      currency: "usd",
      description: "Money for phones",
      source: req.body.token.id
    });
    console.log(charge);
    console.log("some code after");
  });

  //   router.post("/api/stripe", (req, res, next) => {
  //     stripe.charges
  //       .create({
  //         amount: req.body.amount / 100,
  //         currency: "usd",
  //         description: "Money for phones",
  //         source: req.body.token.id
  //       })
  //       .then(result => console.log(result));
  //   });
};
