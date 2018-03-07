import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../RegistrationStyle.css";

export default class RegistrationForm extends Component {
  state = {
    email: "",
    fullName: "",
    password: "",
    username: ""
  };

  handleInputChange = e => {
    this.setState({ [e.currentTarget.id]: e.target.value });
  };

  handleValidSubmit = () => {
    const { registerFunction } = this.props;
    const formData = this.state;
    registerFunction(formData);
  };

  render() {
    return (
      <div className={styles.FormContainer}>
        <div className={styles.FormWrapper}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            onChange={this.handleInputChange}
            placeholder="Enter email"
            required
            type="email"
            value={this.state.email}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            minLength="8"
            name="password"
            onChange={this.handleInputChange}
            placeholder="password"
            required
            type="password"
            value={this.state.password}
          />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            onChange={this.handleInputChange}
            placeholder="Enter username"
            required
            type="text"
            value={this.state.username}
          />
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            onChange={this.handleInputChange}
            placeholder="John Doe"
            required
            type="text"
            value={this.state.fullName}
          />

          <button
            onClick={this.handleValidSubmit}
            className="btn blue darken-4"
            style={{ marginRight: 15 }}
          >
            Register
          </button>
          <Link to="/store" className="btn red accent-4">
            Cancel
          </Link>
          <div className={styles.GoToLogIn}>
            Have account? Then Log In by email and password, or Google
          </div>
          <Link to="/login" className="btn blue lighten-5 black-text">
            Log In
          </Link>
        </div>
      </div>
    );
  }
}
