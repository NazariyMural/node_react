import React, { Component } from "react";
import styles from "./CartDataAmount.css";

class CartDataAmount extends Component {
  render() {
    return (
      <div className={styles.CartDataAmount}>
        <span>Sum: </span>
      </div>
    );
  }
}

export default CartDataAmount;
