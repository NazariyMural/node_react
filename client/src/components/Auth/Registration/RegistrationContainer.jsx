import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "../../../actions/userAuthActions";
import RegistrationForm from "./RegistrationForm";

export class RegistrationContainer extends Component {
  registerFunction = userData => {
    this.props.registerUser(userData);
  };

  render() {
    if (this.props.auth === null) {
      return <section>Loading...</section>;
    } else if (this.props.auth) {
      const { isLoggedIn } = this.props.auth;
      if (isLoggedIn) {
        return <Redirect to="/account" />;
      }
    }
    return <RegistrationForm registerFunction={this.registerFunction} />;
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { registerUser })(
  RegistrationContainer
);
