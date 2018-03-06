import React, { Component } from "react";
import styles from "./Account.css";
import { connect } from "react-redux";
import UserProfileEdit from "./UserProfileEdit/UserProfileEdit";
// import UserProfileLocal from "./UserProfileLocal/UserProfileLocal";

class Account extends Component {
  renderUserData = () => {
    // if (this.props.authentication) {
    //   if (this.props.authentication.id) {
    //     return <UserProfileLocal title="Lviv" />;
    //   }
    //   return;
    // }
    if (this.props.auth !== null && this.props.auth !== false) {
      return <UserProfileEdit title="Lviv" />;
    }
  };
  render() {
    return (
      <div className={styles.Account}>
        <h2>User Profile</h2>
        {this.renderUserData()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, authentication }) => {
  return { auth, authentication };
};

export default connect(mapStateToProps)(Account);
