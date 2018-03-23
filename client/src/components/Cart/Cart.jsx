import React, { Component } from "react";
import styles from "./Cart.css";
import { connect } from "react-redux";
import {
  getCart,
  addToCart,
  reduceByOne,
  deleteItem
} from "../../actions/cartActions";
import _ from "lodash";
import CartDataAmount from "../Notification/CartDataAmount/CartDataAmount";
import { NavLink } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

class Cart extends Component {
  // componentWillReceiveProps(nextProps, nextState) {
  //   const currentId = this.props.auth && this.props.auth.googleId;
  //   const nextId = nextProps.auth && nextProps.auth.googleId;
  //   if (currentId !== nextId) {
  //     this.props.getCart(nextProps.auth.googleId);
  //   }
  //   console.log("componentWillReceiveProps");
  // }

  componentDidMount() {
    if (this.props.auth) {
      this.props.getCart(this.props.auth.googleId);
    }
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
        } else {
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
      }
      return (
        <tr>
          <td colSpan="70%" className="center">
            <h2>Loading...</h2>
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
          key={key}
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
