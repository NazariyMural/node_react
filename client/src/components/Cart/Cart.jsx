import React, { Component } from "react";
import styles from "./Cart.css";
import { connect } from 'react-redux';

class Cart extends Component {
  render() {
    console.log(this.props.productID)
    return (
      <div className={styles.Cart}>
        <p>Cart</p>
        {this.props.productID[0]}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    productID: state.cart
  }
}

export default connect(mapStateToProps)(Cart);
