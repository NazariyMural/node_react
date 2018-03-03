import React, { Component } from "react";
// import styles from "./CartDataAmount.css";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import Stripe from "../../Stripe/Stripe";

class CartDataAmount extends Component {
  renderCartData = () => {
    if (!isEmpty(this.props.cart)) {
      if (this.props.cart.userCart.totalQty) {
        return (
          <div>
            <span>Sum: {this.props.cart.userCart.totalQty}</span>
            <br />
            <span>Amount: {this.props.cart.userCart.totalPrice}</span>
            <Stripe totalSum={this.props.cart.userCart.totalPrice * 100} />
          </div>
        );
      }
    }
  };
  render() {
    return (
      <div>
        <span>{this.renderCartData()}</span>
      </div>
    );
  }
}
const mapStateToProps = ({ cart }) => {
  return { cart };
};

export default connect(mapStateToProps)(CartDataAmount);
