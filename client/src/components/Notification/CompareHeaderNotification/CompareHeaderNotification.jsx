import React, { Component } from "react";
import styles from "./CompareHeaderNotification.css";

const badgeClasses = [styles.Badge];
badgeClasses.push("new badge");

class CompareHeaderNotification extends Component {
  renderBadge = () => {
    if (this.props.cart) {
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
      <span className={styles.Compare}>
        <img
          src="https://cdn1.iconfinder.com/data/icons/line-free/24/Weight_scale-128.png"
          alt="compare"
        />
        {this.renderBadge()}
      </span>
    );
  }
}

export default CompareHeaderNotification;
