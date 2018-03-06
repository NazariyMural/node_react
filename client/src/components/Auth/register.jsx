import React, { Component } from "react";
import { Label } from "reactstrap";

export default class RegisterPage extends Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
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
          <Label for="email">Email</Label>
          <input
            id="email"
            name="email"
            onChange={this.handleInputChange}
            placeholder="Enter email"
            required
            type="email"
            value={this.state.email}
          />
          <Label for="password">Password</Label>
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
          <Label for="username">Username</Label>
          <input
            id="username"
            name="username"
            onChange={this.handleInputChange}
            placeholder="CaptainCode"
            required
            type="text"
            value={this.state.username}
          />
          <Label for="firstName">First Name</Label>
          <input
            id="firstName"
            name="firstName"
            onChange={this.handleInputChange}
            placeholder="Jamie"
            required
            type="text"
            value={this.state.firstName}
          />
          <Label for="lastName">Last Name</Label>
          <input
            id="lastName"
            name="lastName"
            onChange={this.handleInputChange}
            placeholder="Smith"
            required
            type="text"
            value={this.state.lastName}
          />

          <button onClick={this.handleValidSubmit} className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
