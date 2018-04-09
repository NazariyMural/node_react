import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
// import map from "lodash/map";
// import Stripe from "../../Stripe/Stripe";
import {
  handlePurchaseSubmit,
  handleDeliverySubmit
} from "../../../actions/cartActions";
import ReactModal from "react-modal";
import ModalContent from "./ModalContentent/PurchaseMessage";
import modalStyles from "./ModalContentent/PurchaseMessage.css";

class CartDataAmount extends Component {
  state = {
    showModal: false,
    message: null
  };
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  purchaseSubmit = () => {
    const { userCart } = this.props.cart;

    this.props
      .handleDeliverySubmit({
        products: userCart.items,
        auth: this.props.auth,
        userID: this.props.cart.userID
      })
      .then(res => {
        this.handlePurchaseMessage(res);
      })
      .catch(err => console.log(err));
  };

  handlePurchaseMessage = data => {
    this.handleOpenModal();
    this.setState({ message: data.message });
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
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className={modalStyles.Modal}
          overlayClassName={modalStyles.Overlay}
          ariaHideApp={false}
        >
          <ModalContent
            handleCloseModal={this.handleCloseModal}
            message={this.state.message}
          />
        </ReactModal>
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
