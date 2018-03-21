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
import { NavLink } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

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
          <td colSpan="70%" className="center">
            <h2>Join us first!</h2>
            <NavLink to={"/login"}>Log In</NavLink>
          </td>
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
          <td colSpan="70%" className="center">
            <h2>Your cart is empty!</h2>
            <h4>Follow to store and buy something</h4>
            <NavLink to={"/"}>Store</NavLink>
          </td>
        </tr>
      );
    }
  };
  renderCart = () => {
    const cartItems = this.props.cart.userCart.items;
    const { addToCart, reduceByOne, deleteItem, auth } = this.props;
    return _.map(cartItems, (item, key) => {
      return (
        <CartItem
          item={item}
          auth={auth}
          addToCart={addToCart}
          reduceByOne={reduceByOne}
          deleteItem={deleteItem}
        />
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
