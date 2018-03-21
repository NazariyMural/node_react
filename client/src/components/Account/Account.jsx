import React, { Component } from "react";
import styles from "./Account.css";
import { connect } from "react-redux";
import UserProfileEdit from "./UserProfileEdit/UserProfileEdit";
import PurchaseHistory from "../Notification/PurchaseHistory/PurchaseHistory";
import { getCart } from "../../actions";

// import CardReactFormContainer from "card-react";

class Account extends Component {
  renderUserData = () => {
    if (this.props.auth !== null && this.props.auth !== false) {
      this.props.getCart(this.props.auth.googleId);
      return (
        <section className={styles.AccountContainer}>
          <div className={styles.UserProfile}>
            <h2>User Profile</h2>
            <UserProfileEdit title="Lviv" />
          </div>

          <div className={styles.UserHistory}>
            <PurchaseHistory />
          </div>
        </section>
      );
    } else if (this.props.auth === false) {
      return <h2 style={{ textAlign: "center" }}>Join us!</h2>;
    }
  };
  render() {
    return <div className={styles.AccountWrapper}>{this.renderUserData()}</div>;
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { getCart })(Account);

/* <CardReactFormContainer
container="card-wrapper"
formInputsNames={{
  number: "CCnumber",
  expiry: "CCexpiry",
  cvc: "CCcvc",
  name: "CCname"
}}
initialValues={{
  number: "4242424242424242",
  cvc: "123",
  expiry: "16/12",
  name: "Random Name"
}}
classes={{
  valid: "valid-input",
  invalid: "invalid-input"
}}
formatting={true}
>
<form>
  <input placeholder="Full name" type="text" name="CCname" />
  <input placeholder="Card number" type="text" name="CCnumber" />
  <input placeholder="MM/YY" type="text" name="CCexpiry" />
  <input placeholder="CVC" type="text" name="CCcvc" />
</form>
</CardReactFormContainer>

<section id="card-wrapper">Card</section> */
