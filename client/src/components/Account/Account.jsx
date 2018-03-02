import React, { Component } from "react";
import styles from "./Account.css";
import { connect } from "react-redux";
import UserProfileEdit from "./UserProfileEdit/UserProfileEdit";

class Account extends Component {
  renderUserData = () => {
    let dataUser;
    if (this.props.auth !== null && this.props.auth !== false) {
      dataUser = { ...this.props.auth };
      return (
        <div>
          <ul className={styles.UserDataList}>
            <li key={dataUser.photos[0]}>
              <img
                src={require(`../../uploads/${dataUser.photos[0]}`)}
                alt="userPhoto"
              />
            </li>
          </ul>
          <UserProfileEdit title="Lviv" />
        </div>
      );
    } else {
      dataUser = <div>Loading...</div>;
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
