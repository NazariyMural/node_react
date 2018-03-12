import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../RegistrationStyle.css";
import Paper from "material-ui/Paper";

const style = {
  Paper: {
    height: 450,
    width: 350,
    padding: "75px 20px 50px 20px",
    margin: 20,
    display: "inline-block",
    position: "relative",
    borderRadius: 10,
    boxSizing: "border-box"
  },
  Circle: {
    margin: 0,
    height: 80,
    width: 120,
    display: "inline-block",
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden"
  }
};

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
        {/* <div className={styles.FormWrapper}> */}
        <Paper zDepth={3} style={style.Paper}>
          <Paper style={style.Circle} zDepth={2}>
            <Link to="/">
              <img
                src="https://i.pinimg.com/originals/ff/8b/7f/ff8b7fa437460c933d3d43a5e2d6cffe.jpg"
                alt="cool-logo"
                className={styles.LogoImg}
              />
            </Link>
          </Paper>
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
          <div className={styles.LoginBtnGroupe}>
            <button
              className="waves-effect waves-light btn"
              onClick={this.handleSubmit}
            >
              Log In
            </button>
            <a
              href="/api/auth/google"
              className="waves-effect waves-light btn red darken-3"
            >
              <i className="material-icons left">g_translate</i>Google Log
            </a>
          </div>
          <div className={styles.SingUpGroupe}>
            <h6>Haven't accout yet?</h6>
            <Link to="/register" className="btn blue darken-3">
              Sing Up
            </Link>
          </div>
        </Paper>
      </div>
    );
  }
}
