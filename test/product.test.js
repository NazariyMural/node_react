const Product = require("../models/Product");
const expect = require("expect");
const request = require("supertest");
const mongoose = require("mongoose");
const product_routs = require("../routs/store");
const app = require("../app");

// mongoose.connect(
//   `mongodb://nazariy:password@ds121889.mlab.com:21889/eliftech_test`
// );

beforeEach(done => {
  Product.remove({}).then(() => done());
});

describe("POST /api/store/store", () => {
  it("should add new product", done => {
    let product_sample = {
      _id: new mongoose.Types.ObjectId(),
      name: "Golf 4",
      price: 4400,
      weight: 1650,
      category: "car",
      images: "https://blaaa",
      comments: ["1", "2"],
      props: { some: "props" },
      tags: ["car", "VW"],
      descr: "some"
    };
    request(app)
      .post("/api/store/store")
      .send(product_sample)
      .expect(200)
      .expect(res => {
        expect(res.body.name).toBe(product_sample.name);
      })
      .end((err, response) => {
        if (err) {
          return done(err);
        }

        Product.find()
          .then(product => {
            expect(product.length).toBe(1);
            expect(product[0].name).toBe(product_sample.name);
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should not create product with invalid property", done => {
    request(app)
      .post("/api/store/store")
      .send({})
      .expect(400)
      .end((err, response) => {
        if (err) {
          return done(err);
        }
        Product.find()
          .then(product => {
            expect(product.length).toBe(0);
            done();
          })
          .catch(err => done(err));
      });
  });
});
