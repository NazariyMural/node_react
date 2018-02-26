import React, { Component } from "react";
// import styles from "./Header.css";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Header extends Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return (
          <li>
            <p href="/">Loading...</p>
          </li>
        );
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  };

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <NavLink
            to={this.props.auth ? "/store" : "/"}
            className="left brand-logo"
          >
            Eliftech Market
          </NavLink>
          <ul className="right">
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/account/new">User</NavLink>
            </li>
            <li>
              <NavLink to="/store">Store</NavLink>
            </li>
            <li>
              <NavLink to="/account">Account</NavLink>
            </li>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
