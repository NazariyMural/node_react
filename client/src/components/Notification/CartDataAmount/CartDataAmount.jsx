import React, { Component } from "react";
// import styles from "./CartDataAmount.css";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
// import map from "lodash/map";
// import Stripe from "../../Stripe/Stripe";
import { handlePurchaseSubmit } from "../../../actions";

class CartDataAmount extends Component {
  // handlePurchaseHistory = () => {
  //   const { userCart } = this.props.cart;
  //   map(userCart.items, (item, key) => {
  //     console.log(item);
  //   });
  // };
  renderCartData = () => {
    const { userCart } = this.props.cart;
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
              onClick={() =>
                this.props.handlePurchaseSubmit({
                  products: userCart.items,
                  userID: this.props.cart.userID
                })
              }
            >
              Pay
            </button>
          </div>
        );
      }
    }
  };
  render() {
    // console.log(this.props.cart);
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

export default connect(mapStateToProps, { handlePurchaseSubmit })(
  CartDataAmount
);
