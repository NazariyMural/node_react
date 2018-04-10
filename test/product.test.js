const Product = require("../models/Product");
const expect = require("expect");
const request = require("supertest");
const mongoose = require("mongoose");
const product_routs = require("../routs/store");
const app = require("../app");

const temp_store = [];

let products_samples = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Golf 5",
    price: 4400,
    weight: 1650,
    category: "car",
    images: "https://blaaa",
    comments: ["1", "2"],
    props: { some: "props" },
    tags: ["car", "VW"],
    descr: "some"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Golf 6",
    price: 9400,
    weight: 1450,
    category: "car",
    images: "https://blaaa",
    comments: ["1", "2"],
    props: { some: "props" },
    tags: ["car", "VW"],
    descr: "some new"
  }
];

beforeEach(done => {
  Product.remove({})
    .then(() => {
      return Product.insertMany(products_samples);
    })
    .then(() => done());
});

// describe("POST /api/store/store", () => {
//   it("should add new product", done => {
//     let product_golf = {
//       _id: new mongoose.Types.ObjectId(),
//       name: "Golf 4",
//       price: 4400,
//       weight: 1650,
//       category: "car",
//       images: "https://blaaa",
//       comments: ["1", "2"],
//       props: { some: "props" },
//       tags: ["car", "VW"],
//       descr: "some"
//     };
//     request(app)
//       .post("/api/store/store")
//       .send(product_golf)
//       .expect(200)
//       .expect(res => {
//         expect(res.body.name).toBe(product_golf.name);
//       })
//       .end((err, response) => {
//         if (err) {
//           return done(err);
//         }

//         Product.find({ name: product_golf.name })
//           .then(product => {
//             expect(product.length).toBe(1);
//             expect(product[0].name).toBe(product_golf.name);
//             done();
//           })
//           .catch(err => done(err));
//       });
//   });

//   it("should not create product with invalid property", done => {
//     request(app)
//       .post("/api/store/store")
//       .send({})
//       .expect(400)
//       .end((err, response) => {
//         if (err) {
//           return done(err);
//         }
//         Product.find()
//           .then(product => {
//             expect(product.length).toBe(2);
//             done();
//           })
//           .catch(err => done(err));
//       });
//   });
// });

// describe("GET /api/store/:id", () => {
//   it("should get all products", done => {
//     request(app)
//       .get("/api/store/:id")
//       .expect(200)
//       .expect(res => {
//         expect(res.body.length).toBe(2);
//       })
//       .end((err, response) => {
//         if (err) {
//           return done(err);
//         }
//         done();
//       });
//   });
// });
