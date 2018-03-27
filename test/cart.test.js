const Product = require("../models/Product");
const expect = require("expect");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Cart = require("../models/Cart");
const User = require("../models/UserSingUp");

const cart_sample = {
  userID: "5ab90c6765ce0c201c9d5773",
  userCart: {
    items: {
      "5ab8d6cfd35f0b3904c4758c": {
        item: {
          comments: ["1", "2"],
          tags: ["car", "VW"],
          _id: "5ab8d6cfd35f0b3904c4758c",
          name: "Golf 5",
          price: 4400,
          weight: 1650,
          category: "car",
          images: "https://blaaa",
          props: { some: "props" },
          descr: "some,",
          __v: 0
        },
        qty: 3,
        price: 4400
      },
      "5ab8d6cfd35f0b3904c4758d": {
        item: {
          comments: ["1", "2"],
          tags: ["car", "VW"],
          _id: "5ab8d6cfd35f0b3904c4758d",
          name: "Golf 6",
          price: 9400,
          weight: 1450,
          category: "car",
          images: "https://blaaa",
          props: { some: "props" },
          descr: "some, new",
          __v: 0
        },
        qty: 4,
        price: 4400
      }
    },
    totalQty: 7,
    totalPrice: 4400
  }
};

beforeEach(done => {
  Cart.remove({})
    .then(() => {
      return Cart.insertMany(cart_sample);
    })
    .then(() => done());
});

describe("POST /api/cart/add-to-cart", () => {
  it("should add existing product to cart", done => {
    User.findOne().then(user => {
      Product.findOne().then(product_golf => {
        request(app)
          .post("/api/cart/add-to-cart")
          .send({ userID: user.googleId, productId: product_golf._id })
          .expect(200)
          .expect(res => {
            expect(res.body.userID).toBe(user.googleId);
            const cart_product = res.body.userCart.items[product_golf._id].item;

            expect(JSON.stringify(cart_product)).toBe(
              JSON.stringify(product_golf)
            );
          })
          .end((err, response) => {
            if (err) {
              return done(err);
            }

            Cart.find({ userID: user.googleId })
              .then(cart => {
                expect(cart.length).toBe(1);
                done();
              })
              .catch(err => done(err));
          });
      });
    });
  });
});

// describe("POST /api/cart/reduce-by-one", () => {
//   it("should reduce product qty", done => {
//     //add few products
//     User.findOne().then(user => {
//       Product.findOne().then(product_golf => {
//         request(app)
//           .post("/api/cart/reduce-by-one")
//           .send({
//             userID: cart_sample.userID,
//             productId: product_golf._id
//           })
//           .expect(200)
//           .expect(res => {
//             console.log(res, "res");
//           })
//           .end((err, response) => {
//             if (err) {
//               return done(err);
//             }
//             done();
//           });
//       });
//     });
//     // Cart.find()
//     //   .then(cart => {
//     //     console.log(cart);
//     //     //   expect(cart.length).toBe(1);
//     //     done();
//     //   })
//     //   .catch(err => done(err));
//   });
// });
