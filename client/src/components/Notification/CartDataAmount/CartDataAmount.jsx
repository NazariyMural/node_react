import React, { Component } from "react";
// import styles from "./CartDataAmount.css";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
// import map from "lodash/map";
// import Stripe from "../../Stripe/Stripe";
import {
  handlePurchaseSubmit,
  handleDeliverySubmit
} from "../../../actions/cartActions";

class CartDataAmount extends Component {
  purchaseSubmit = () => {
    const { userCart } = this.props.cart;
    // this.props.handlePurchaseSubmit({
    //   products: userCart.items,
    //   userID: this.props.cart.userID,
    //   totalPrice: userCart.totalPrice
    // });
    this.props.handleDeliverySubmit({
      products: userCart.items,
      auth: this.props.auth
    });
  };

  renderCartData = () => {
    const { userCart, auth } = this.props.cart;
    if (auth) {
      if (!isEmpty(this.props.cart)) {
        if (userCart.totalQty) {
          return (
            <div>
              <span>Sum: {userCart.totalQty}</span>
              <br />
              <span>Amount: {userCart.totalPrice}</span>
              {/* <Stripe totalSum={this.props.cart.userCart.totalPrice * 100} /> */}
              <br />
              <button
                type="submit"
                className="btn"
                onClick={this.purchaseSubmit}
              >
                Pay
              </button>
            </div>
          );
        }
      }
    }
    return null;
  };

  render() {
    return (
      <div>
        <span>{this.renderCartData()}</span>
      </div>
    );
  }
}
const mapStateToProps = ({ cart, auth }) => {
  return { cart, auth };
};

export default connect(mapStateToProps, {
  handlePurchaseSubmit,
  handleDeliverySubmit
})(CartDataAmount);
