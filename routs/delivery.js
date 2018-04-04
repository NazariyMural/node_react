const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const mongoose = require("mongoose");
const Products = require("../models/Product");
const map = require("lodash/map");
const moment = require("moment");

router.post("/api/orders", (req, res) => {
  const products = req.body.products;
  const auth = req.body.auth;

  console.log(products);
  console.log(auth);
});

module.exports = router;
