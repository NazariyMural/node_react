import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "../../actions/";

import RegisterPage from "./register";

export class RegisterPageContainer extends Component {
  registerFunction = userData => {
    const { dispatch } = this.props;
    dispatch(registerUser(userData));
  };

  render() {
    const { isLoggedIn, registrationSucceeded } = this.props.authentication;
    if (registrationSucceeded) {
      return <Redirect to="/account" />;
    }

    if (isLoggedIn) {
      return <p>Please log out before registering a new user</p>;
    }
    return <RegisterPage registerFunction={this.registerFunction} />;
  }
}

const mapStateToProps = state => ({ authentication: state.authentication });

export default connect(mapStateToProps)(RegisterPageContainer);
