// import { beforeEach } from "mocha";

// const mocha = require("expect");
// const request = require("supertest");
// const mongoose = require("mongoose");
// const cart_routs = require("../routs/cart");
// const Cart = require("../models/Cart");

// mongoose.connect(
//   `mongodb://nazariy:password@ds121889.mlab.com:21889/eliftech_test`
// );

// beforeEach = () => {
//   let product = new Product({
//     _id: new mongoose.Types.ObjectId(),
//     name: "Golf 4",
//     price: 4400,
//     weight: 1650,
//     category: "car",
//     images: "https://blaaa",
//     comments: ["1", "2"],
//     props: { some: "props" },
//     tags: ["car", "VW"],
//     descr: "some"
//   });
// };

// describe("POST /api/add-to-cart", () => {
//   it("should add new product", done => {
//     request(cart_routs)
//       .post("/api/cart/add-to-cart")
//       .send({});
//   });

//   it("should return a cart", done => {
//     request(cart_routs)
//       .get("/api/cart/:id")
//       .send({});
//   });
// });
