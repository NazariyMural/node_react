import React, { Component } from "react";
import styles from "./Account.css";
import { connect } from "react-redux";
import UserProfileEdit from "./UserProfileEdit/UserProfileEdit";
// import UserProfileLocal from "./UserProfileLocal/UserProfileLocal";

class Account extends Component {
  renderUserData = () => {
    if (this.props.auth !== null && this.props.auth !== false) {
      return (
        <section>
          <h2>User Profile</h2>
          <UserProfileEdit title="Lviv" />
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

const mapStateToProps = ({ auth, authentication }) => {
  return { auth, authentication };
};

export default connect(mapStateToProps)(Account);
