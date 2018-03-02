import React, { Component } from "react";
import styles from "./Account.css";
import { connect } from "react-redux";
import UserProfileEdit from "./UserProfileEdit/UserProfileEdit";

class Account extends Component {
  renderUserData = () => {
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

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Account);
