import React, { Component } from "react";
import styles from "./Header.css";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { logUserOut } from "../../actions";
import CartHeaderNotification from "../Notification/CartDataAmount/CartHeaderItem/CartHeaderItem";

class Header extends Component {
  logOutClick = e => {
    e.preventDefault();
    this.props.logUserOut();
    return <Redirect to="/store" />;
  };

  renderContent = () => {
    if (this.props.auth === false) {
      return (
        <li key="2" className={styles.HeaderListItem}>
          <NavLink to="/login">Log In</NavLink>
        </li>
      );
    } else if (this.props.auth) {
      return (
        <li key="2" className={styles.HeaderListItem}>
          <span>{this.props.auth.fullName}</span>
          <a href="/api/auth/logout" onClick={this.logOutClick}>
            Logout
          </a>
        </li>
      );
    } else {
      return (
        <li>
          {/* <p href="/">Loading...</p>
         */}
          <a href="/api/auth/google">Log In with Google</a>
        </li>
      );
    }
  };

  render() {
    return (
      <nav className={styles.Header}>
        <div className="nav-wrapper">
          <NavLink
            to={this.props.auth ? "/store" : "/"}
            className="left brand-logo"
          >
            Eliftech Market
          </NavLink>

          <ul className="right">
            {/* <li>
              <NavLink exact to="/login">
                Login
              </NavLink>
            </li>

            <li>
              <NavLink exact to="/register">
                Register
              </NavLink>
            </li> */}

            <li>
              <NavLink to="/store">Store</NavLink>
            </li>
            <li>
              <NavLink to="/account">Account</NavLink>
            </li>
            <li className={styles.HeaderListItem}>
              <NavLink to="/cart" className={styles.HeaderListNav}>
                Cart
                <CartHeaderNotification cart={this.props.cart} />
              </NavLink>
            </li>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth, cart }) => {
  return { auth, cart };
};

export default connect(mapStateToProps, { logUserOut })(Header);
