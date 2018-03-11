import React, { Component } from "react";
// import styles from "./PurchaseHistory.css";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { removeCart } from "../../../actions";
import PurchaseHistoryItems from "./PurchaseHistoryItems/PurchaseHistoryItems";

class PurchaseHistory extends Component {
  cleanPurchaseHistory = () => {
    this.props.removeCart(this.props.auth.googleId);
  };
  renderPurchaseHistory = () => {
    if (!isEmpty(this.props.cart)) {
      if (!isEmpty(this.props.cart.userPurchase)) {
        return (
          <PurchaseHistoryItems
            purchaseHistory={this.props.cart.userPurchase}
            cleanPurchaseHistory={this.cleanPurchaseHistory}
          />
        );
      }
    } else {
      return (
        <div>
          <h3>Your haven't any purchase yet! Buy something...</h3>
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        <span>{this.renderPurchaseHistory()}</span>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, cart }) => {
  return { auth, cart };
};

export default connect(mapStateToProps, { removeCart })(PurchaseHistory);
