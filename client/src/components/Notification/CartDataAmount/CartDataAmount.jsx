import React, { Component } from "react";
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
    this.props.handleDeliverySubmit({
      products: userCart.items,
      auth: this.props.auth,
      userID: this.props.cart.userID,
      totalPrice: userCart.totalPrice
    });
  };

  renderCartData = () => {
    const { cart, auth } = this.props;
    if (!isEmpty(this.props.cart) && auth) {
      if (cart.userCart.totalQty) {
        return (
          <div>
            <span>Sum: {cart.userCart.totalQty}</span>
            <br />
            <span>Amount: {cart.userCart.totalPrice}</span>
            {/* <Stripe totalSum={this.props.cart.userCart.totalPrice * 100} /> */}
            <br />
            <button type="submit" className="btn" onClick={this.purchaseSubmit}>
              Pay
            </button>
          </div>
        );
      }
    }
    // }
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
