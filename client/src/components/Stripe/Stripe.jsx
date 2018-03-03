import React, { Component } from "react";
import styles from "./Stripe.css";
import StripeCheckout from "react-stripe-checkout";
import { handleStripeToken } from "../../actions";
import { connect } from "react-redux";

class Stripe extends Component {
  render() {
    return (
      <div className={styles.Stripe}>
        <StripeCheckout
          name="ElifTechMarket"
          description="This money for the phones that you want to buy!"
          amount={this.props.totalSum}
          token={token =>
            this.props.handleStripeToken({ token, amount: this.props.totalSum })
          }
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn">Pay</button>
        </StripeCheckout>
      </div>
    );
  }
}

export default connect(null, { handleStripeToken })(Stripe);
