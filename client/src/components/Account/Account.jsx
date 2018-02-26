import React, { Component } from "react";
import styles from "./Account.css";
import { connect } from 'react-redux';
import map from 'lodash/map'

class Surveys extends Component {
  renderUserData = () => {
    let dataUser;
    if (this.props.auth !== null && this.props.auth !== false) {
      dataUser = { ...this.props.auth }
      console.log(dataUser);
      return (
        <ul className={styles.UserDataList}>
          <li key={dataUser.photos[0][0]['value']}>
            <img src={dataUser.photos[0][0]['value']} alt="userPhoto" />
          </li>
          <li key={dataUser.name}>{dataUser.name}</li>
          <li key={dataUser.emails[0][0]['value']}>Email: {dataUser.emails[0][0]['value']}</li>
          <li key={dataUser.placesLived[0]}>Place lived: {dataUser.placesLived[0]}</li>

        </ul>
      )
      // map(dataUser, (data, key) => {
      //   return (
      //     <ul>
      //       <li key={email}>{email}</li>
      //       <li key={user.name}>{user.name}</li>
      //     </ul>
      //   )
      // })
    }
    else {
      dataUser = <div>Loading...</div>;
    }
    // return dataUser;
  }
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
  return { auth }
}

export default connect(mapStateToProps)(Surveys);
