import React, { Component } from "react";
import styles from "./Account.css";
import { connect } from "react-redux";
// import map from "lodash/map";
import UserProfileEdit from "./UserProfileEdit/UserProfileEdit";

class Account extends Component {
  renderUserData = () => {
    let dataUser;
    if (this.props.auth !== null && this.props.auth !== false) {
      dataUser = { ...this.props.auth };
      return (
        <div>
          <ul className={styles.UserDataList}>
            <li key={dataUser.photos[0][0]["value"]}>
              <img src={dataUser.photos[0][0]["value"]} alt="userPhoto" />
            </li>
            <li key={dataUser.name}>{dataUser.name}</li>
            <li key={dataUser.emails[0][0]["value"]}>
              Email: {dataUser.emails[0][0]["value"]}
            </li>
          </ul>
          <UserProfileEdit title="Lviv" />
        </div>
      );
    } else {
      dataUser = <div>Loading...</div>;
    }
    // return dataUser;
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
