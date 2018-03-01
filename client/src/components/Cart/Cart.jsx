import React, { Component } from "react";
import styles from "./Cart.css";
import { connect } from "react-redux";
import {
  getCart,
  addToCart,
  reduceByOne,
  deleteItem
} from "../../actions/index";
import _ from "lodash";
import CartDataAmount from "../Notification/CartDataAmount/CartDataAmount";

class Cart extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.props.auth) {
        this.props.getCart(this.props.auth.googleId);
      } else {
        setTimeout(() => {
          this.props.getCart(this.props.auth.googleId);
        }, 500);
      }
    }, 500);
  }
  renderData = () => {
    if (this.props.auth === null) {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      );
    } else if (this.props.auth === false) {
      return <div>Join us firs!!!</div>;
    } else if (this.props.auth) {
      if (!_.isEmpty(this.props.cart)) {
        if (!_.isEmpty(this.props.cart.userCart.items)) {
          return this.renderCart();
        }
      }
      return (
        <tr>
          <td>Your cart is empty!</td>
        </tr>
      );
    }
  };
  renderCart = () => {
    // const cart = this.props.cart;
    const cartItems = this.props.cart.userCart.items;
    // console.log(cart);

    return _.map(cartItems, (item, key) => {
      return (
        <tr key={item.item._id}>
          <td>
            <img
              src={item.item.img[0]}
              alt="data"
              className={styles.CartImage}
            />
          </td>
          <td>{item.item.name}</td>
          <td>{item.price}</td>
          <td>{item.qty}</td>
          <td className={styles.CartTdIconItem}>
            <span
              className={styles.CartIncrease}
              onClick={() =>
                this.props.addToCart({
                  productId: item.item._id,
                  userID: this.props.auth.googleId
                })
              }
            >
              <i className="material-icons">add_box</i>
            </span>
          </td>
          <td className={styles.CartTdIconItem}>
            <span
              className={styles.CartDecrease}
              onClick={() =>
                this.props.reduceByOne({
                  productId: item.item._id,
                  userID: this.props.auth.googleId
                })
              }
            >
              <i className="material-icons">indeterminate_check_box</i>
            </span>
          </td>
          <td className={styles.CartTdIconItem}>
            <span
              className={styles.CartDelete}
              onClick={() =>
                this.props.deleteItem({
                  productId: item.item._id,
                  userID: this.props.auth.googleId
                })
              }
            >
              <i className="material-icons">delete</i>
            </span>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className={styles.Cart}>
        <table className="striped bordered">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>{this.renderData()}</tbody>
        </table>
        <CartDataAmount />
      </div>
    );
  }
}

const mapStateToProps = ({ products, cart, auth }) => {
  return {
    products,
    cart,
    auth
  };
};

export default connect(mapStateToProps, {
  getCart,
  addToCart,
  reduceByOne,
  deleteItem
})(Cart);

// import React, { Component } from "react";
// import styles from "./Cart.css";
// import { connect } from "react-redux";
// import CartDataAmount from "./CartDataAmount/CartDataAmount";
// import {
//   getCart,
//   fetchData,
//   increaseQuantity,
//   deleteFromCart,
//   decreaseQuantity
// } from "../../actions/index";
// import _ from "lodash";

// class Cart extends Component {
//   componentDidMount() {
//     this.props.fetchData();
//     setTimeout(() => {
//       this.props.getCart(this.props.user.googleId);
//     }, 500);
//   }

//   renderUserPurchase = () => {
//     if (!_.isEmpty(this.props.cart) && !_.isEmpty(this.props.cart.productsID)) {
//       let hash = {};
//       const arrID = this.props.cart.productsID;
//       arrID.forEach(id => {
//         if (!hash[id]) hash[id] = 0;
//         hash[id]++;
//       });
//       const filtered = this.props.products.filter(el => {
//         if (hash[el._id]) {
//           el["quantity"] = hash[el._id];
//           return el;
//         }
//         return false;
//       });
//       return this.renderCart(filtered);
//     } else {
//       return (
//         <tr>
//           <td colSpan="75%">
//             <h2>Cart is empty</h2>
//           </td>
//         </tr>
//       );
//     }
//   };

//   renderCart = filtered => {
//     let tableCart = _.map(filtered, (el, key) => {
//       return (
//         <tr key={el._id}>
//           <td>
//             <img src={el.img[0]} alt="data" className={styles.CartImage} />
//           </td>
//           <td>{el.name}</td>
//           <td>{el.price}</td>
//           <td>{el.quantity}</td>
//           <td className={styles.CartTdIconItem}>
//             <span
//               className={styles.CartIncrease}
//               onClick={() =>
//                 this.props.increaseQuantity({
//                   id: el._id,
//                   userID: this.props.user.googleId
//                 })
//               }
//             >
//               <i className="material-icons">add_box</i>
//             </span>
//           </td>
//           <td className={styles.CartTdIconItem}>
//             <span
//               className={styles.CartDecrease}
//               onClick={() =>
//                 this.props.decreaseQuantity({
//                   id: el._id,
//                   userID: this.props.user.googleId
//                 })
//               }
//             >
//               <i className="material-icons">indeterminate_check_box</i>
//             </span>
//           </td>
//           <td className={styles.CartTdIconItem}>
//             <span
//               className={styles.CartDelete}
//               onClick={() =>
//                 this.props.deleteFromCart({
//                   id: el._id,
//                   userID: this.props.user.googleId
//                 })
//               }
//             >
//               <i className="material-icons">delete</i>
//             </span>
//           </td>
//         </tr>
//       );
//     });
//     return tableCart;
//   };

//   render() {
//     return (
//       <div className={styles.Cart}>
//         <table className="striped bordered">
//           <thead>
//             <tr>
//               <th />
//               <th>Name</th>
//               <th>Price</th>
//               <th>Quantity</th>
//             </tr>
//           </thead>
//           <tbody>{this.renderUserPurchase()}</tbody>
//         </table>
//         <CartDataAmount />
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     cart: state.cart,
//     user: state.auth,
//     products: state.products
//   };
// };

// export default connect(mapStateToProps, {
//   getCart,
//   fetchData,
//   increaseQuantity,
//   deleteFromCart,
//   decreaseQuantity
// })(Cart);

// class Cart extends Component {
//   componentDidMount() {
//     this.props.fetchData();
//   }
//   renderCartHandler = () => {
//     let data = <p>Loading...</p>;
//     if (!this.props.auth === null) {
//       return data;
//     } else if (this.props.auth === false) {
//       data = <div>Join us firs!</div>;
//     } else if (this.props.auth) {
//       this.props.getCart(this.props.auth.googleId);
//       let products = this.props.products;
//       return (
//         <ul>
//           <li>{JSON.stringify(this.props.cart)}</li>
//         </ul>
//       );
//     }
//     return data;
//   };
//   render() {
//     return (
//       <div>
//         <div>Cart</div>
//         <ul>{this.renderCartHandler()}</ul>
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ products, auth, cart }) => {
//   return {
//     products,
//     auth
//     // cart
//   };
// };

// export default connect(mapStateToProps, { fetchData, addToCart, getCart })(
//   Cart
// );
