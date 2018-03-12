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
      return (
        <tr>
          <td>Join us first!</td>
        </tr>
      );
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
    const cartItems = this.props.cart.userCart.items;

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
      <div className="container">
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
          <br />
        </div>
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
