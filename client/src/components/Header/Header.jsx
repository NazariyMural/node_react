import React, { Component } from "react";
import styles from "./Header.css";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logUserOut } from "../../actions";
import CartHeaderNotification from "../Notification/CartDataAmount/CartHeaderItem/CartHeaderItem";

class Header extends Component {
  logOutClick = e => {
    e.preventDefault();
    this.props.logUserOut();
  };

  renderContent = () => {
    // switch (this.props.authentication) { // this.props.auth
    //   case null:
    //     return (
    //       <li>
    //         <p href="/">Loading...</p>
    //       </li>
    //     );
    //   case false:
    //     return (
    //       <li>
    //         <a href="/auth/google">Login with Password</a>
    //       </li>
    //     );
    //   case this.props.authentication.hasOwnProperty("isLoggedIn"):
    //     console.log(this.props.authentication.isLoggedIn);
    //     return (
    //       <li key="2">
    //         <a href="/api/logout">Logout</a>
    //       </li>
    //     );
    //   default:
    //     return [
    //       <li key="2">
    //         <a href="/api/logout">Some problem</a>
    //       </li>
    //     ];
    // }
    if (this.props.authentication) {
      // if (!this.props.authentication.isLoggedIn) {
      //   return (
      //     <li>
      //       <a href="/auth/google">Login with Password</a>
      //     </li>
      //   );
      // } else {
      //   return (
      //     <li key="2">
      //       <a href="/api/logout">Logout</a>
      //     </li>
      //   );
      // }
      return (
        <li key="2">
          <a href="/api/auth/logout" onClick={this.logOutClick}>
            Logout
          </a>
        </li>
      );
    } else {
      return (
        <li>
          <p href="/">Loading...</p>
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
            <li>
              <NavLink exact to="/login">
                Login
              </NavLink>
            </li>

            <li>
              <NavLink exact to="/register">
                Register
              </NavLink>
            </li>

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

const mapStateToProps = ({ auth, cart, authentication }) => {
  return { auth, cart, authentication };
};

export default connect(mapStateToProps, { logUserOut })(Header);
