import React, { Component } from "react";

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
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
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
            placeholder="CaptainCode"
            required
            type="text"
            value={this.state.username}
          />
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            onChange={this.handleInputChange}
            placeholder="Smith"
            required
            type="text"
            value={this.state.fullName}
          />

          <button onClick={this.handleValidSubmit} className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
