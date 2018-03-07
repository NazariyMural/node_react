import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "../../../actions";

import RegistrationForm from "./RegistrationForm";

export class RegistrationContainer extends Component {
  registerFunction = userData => {
    this.props.registerUser(userData);
  };

  render() {
    if (this.props.auth === null) {
      return <section>Loading...</section>;
    } else if (this.props.auth) {
      const { isLoggedIn, registrationSucceeded } = this.props.auth;
      if (registrationSucceeded) {
        return <Redirect to="/account" />;
      }
      if (isLoggedIn) {
        return <p>Please log out before registering a new user</p>;
      }
    }
    return <RegistrationForm registerFunction={this.registerFunction} />;
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { registerUser })(
  RegistrationContainer
);
