import React, { Component } from "react";
import styles from "./Cart.css";
import { connect } from "react-redux";
import CartDataAmount from "./CartDataAmount/CartDataAmount";
import {
  getCart,
  fetchData,
  increaseQuantity,
  deleteFromCart,
  decreaseQuantity
} from "../../actions/index";
import _ from "lodash";

class Cart extends Component {
  componentDidMount() {
    this.props.fetchData();
    setTimeout(() => {
      this.props.getCart(this.props.user.googleId);
    }, 500);
  }

  renderUserPurchase = () => {
    if (!_.isEmpty(this.props.cart) && !_.isEmpty(this.props.cart.productsID)) {
      let hash = {};
      const arrID = this.props.cart.productsID;
      arrID.forEach(id => {
        if (!hash[id]) hash[id] = 0;
        hash[id]++;
      });
      const filtered = this.props.products.filter(el => {
        if (hash[el._id]) {
          el["quantity"] = hash[el._id];
          return el;
        }
        return false;
      });
      return this.renderCart(filtered);
    } else {
      return (
        <tr>
          <td colSpan="75%">
            <h2>Cart is empty</h2>
          </td>
        </tr>
      );
    }
  };

  renderCart = filtered => {
    let tableCart = _.map(filtered, (el, key) => {
      return (
        <tr key={el._id}>
          <td>
            <img src={el.img[0]} alt="data" className={styles.CartImage} />
          </td>
          <td>{el.name}</td>
          <td>{el.price}</td>
          <td>{el.quantity}</td>
          <td className={styles.CartTdIconItem}>
            <span
              className={styles.CartIncrease}
              onClick={() =>
                this.props.increaseQuantity({
                  id: el._id,
                  userID: this.props.user.googleId
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
                this.props.decreaseQuantity({
                  id: el._id,
                  userID: this.props.user.googleId
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
                this.props.deleteFromCart({
                  id: el._id,
                  userID: this.props.user.googleId
                })
              }
            >
              <i className="material-icons">delete</i>
            </span>
          </td>
        </tr>
      );
    });
    return tableCart;
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
          <tbody>{this.renderUserPurchase()}</tbody>
        </table>
        <CartDataAmount />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.auth,
    products: state.products
  };
};

export default connect(mapStateToProps, {
  getCart,
  fetchData,
  increaseQuantity,
  deleteFromCart,
  decreaseQuantity
})(Cart);
