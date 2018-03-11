import React, { Component } from "react";
import styles from "./Account.css";
import { connect } from "react-redux";
import UserProfileEdit from "./UserProfileEdit/UserProfileEdit";
import PurchaseHistory from "../Notification/PurchaseHistory/PurchaseHistory";
import { getCart } from "../../actions";

class Account extends Component {
  renderUserData = () => {
    if (this.props.auth !== null && this.props.auth !== false) {
      //Get updated cart after deleating all items
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
    return <div className={styles.Account}>{this.renderUserData()}</div>;
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { getCart })(Account);
