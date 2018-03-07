import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logUserIn, googleLogin } from "../../../actions";
import LoginPage from "./LoginForm";

export class LoginPageContainer extends Component {
  logUserInFunction = userData => {
    const { dispatch } = this.props;
    dispatch(logUserIn(userData));
  };

  render() {
    const { auth } = this.props;
    if (auth === null) {
      return <section>Loading...</section>;
    }
    if (auth) {
      if (auth.isLoggedIn) {
        return <Redirect to="/account" />;
      }
    }
    return (
      <div>
        <LoginPage
          loginFunction={this.logUserInFunction}
          googleLogin={this.props.googleLogin}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { googleLogin })(LoginPageContainer);
