import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../RegistrationStyle.css";

export default class LoginPage extends Component {
  state = {
    email: "",
    password: ""
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = () => {
    const { loginFunction } = this.props;
    const formData = this.state;
    loginFunction(formData);
  };

  render() {
    return (
      <div className={styles.FormContainer}>
        <div className={styles.FormWrapper}>
          <label htmlFor="exampleEmail">Email</label>
          <input
            id="userEmail"
            name="email"
            onChange={this.handleEmailChange}
            onKeyPress={this.handleKeyPress}
            placeholder="noreply@musiclist.com"
            required
            type="email"
            value={this.state.email}
          />
          <label htmlFor="userPassword">Password</label>
          <input
            id="userPassword"
            name="password"
            onChange={this.handlePasswordChange}
            onKeyPress={this.handleKeyPress}
            placeholder="password"
            required
            type="password"
            value={this.state.password}
          />
          <span>
            <Link to="/account/reset-password">Forgot your password?</Link>
          </span>
          <br />
          <button
            className="waves-effect waves-light btn"
            onClick={this.handleSubmit}
            style={{ marginRight: 15 }}
          >
            Log In
          </button>
          <Link to="/register" className="btn blue darken-3">
            Sing Up
          </Link>

          <button
            className="btn red darken-3"
            onClick={() => this.props.googleLogin()}
          >
            Log In with Google
          </button>
        </div>
      </div>
    );
  }
}
