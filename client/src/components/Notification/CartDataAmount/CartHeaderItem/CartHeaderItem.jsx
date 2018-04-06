import React, { Component } from "react";
import styles from "./CartHeaderNotification.css";

const badgeClasses = [styles.Badge];
badgeClasses.push("new badge");

class CartHeaderNotification extends Component {
  renderBadge = () => {
    if (this.props.cart && this.props.auth) {
      if (this.props.cart.userCart) {
        if (this.props.cart.userCart.totalQty > 0) {
          return (
            <span
              data-badge-caption=""
              className={badgeClasses.join(" ")}
              id="badge"
              style={{ minWidth: 21, padding: 0, borderRadius: "50%" }}
            >
              {this.props.cart.userCart.totalQty}
            </span>
          );
        }
      }
    }
    return null;
  };

  render() {
    return (
      <span className={styles.Cart}>
        <i className="material-icons">shopping_cart</i>
        {this.renderBadge()}
      </span>
    );
  }
}

export default CartHeaderNotification;
