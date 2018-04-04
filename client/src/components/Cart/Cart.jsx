import React, { Component } from "react";
import styles from "./Cart.css";
import { connect } from "react-redux";
import {
  getCart,
  addToCart,
  reduceByOne,
  deleteItem,
  checkPrice
} from "../../actions/cartActions";
import _ from "lodash";
import CartDataAmount from "../Notification/CartDataAmount/CartDataAmount";
import { NavLink } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

class Cart extends Component {
  componentDidMount() {
    if (this.props.auth) {
      this.props.getCart(this.props.auth.googleId);
      this.props.checkPrice(this.props.auth.googleId);
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
          handlePriceRender={this.handlePriceRender}
        />
      );
    });
  };

  //price was changed modal hendler
  handlePriceRender = (
    totalItemPrice,
    itemQty,
    originalPrice,
    currentPrice
  ) => {
    if (originalPrice > currentPrice) {
      return (
        <span className={styles.DiscountCont}>
          <span className={styles.OldPrice}>{`$${originalPrice *
            itemQty}`}</span>
          <span className={styles.Discount}>{`$${currentPrice *
            itemQty}`}</span>
        </span>
      );
    }
    return <span className={styles.Price}>{`$${currentPrice}`}</span>;
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

const mapStateToProps = ({ cart, auth, getAllProducts }) => {
  return {
    getAllProducts,
    cart,
    auth
  };
};

export default connect(mapStateToProps, {
  getCart,
  addToCart,
  reduceByOne,
  deleteItem,
  checkPrice
})(Cart);
