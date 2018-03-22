import React, { Component } from "react";
import styles from "./Header.css";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { logUserOut } from "../../actions";
import CartHeaderNotification from "../Notification/CartDataAmount/CartHeaderItem/CartHeaderItem";
import CompareHeaderNotification from "../Notification/CompareHeaderNotification/CompareHeaderNotification";
import Drawer from "./Drawer/Drawer";
//
class Header extends Component {
  state = {
    open: false
  };

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

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
        <div className={styles.UserAuthStatus}>
          <li key="1" className={styles.HeaderListItem}>
            <NavLink to="/account">{this.props.auth.fullName}</NavLink>
          </li>
          <li key="2" className={styles.HeaderListItem}>
            <a href="/api/auth/logout" onClick={this.logOutClick}>
              Logout
            </a>
          </li>
        </div>
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
          <div className={styles.Logo}>
            <NavLink
              to={this.props.auth ? "/account" : "/login"}
              className="left brand-logo"
            >
              Eliftech Market
            </NavLink>
          </div>
          <div className={styles.Hamb}>
            <i className="material-icons" onClick={this.handleToggle}>
              menu
            </i>
          </div>

          <ul className="right">
            <div className={styles.HeaderMarketLink}>
              <li className={styles.HeaderListItem}>
                <NavLink to="/">Home</NavLink>
              </li>
              <li className={styles.HeaderListItem}>
                <NavLink to="/compare" className={styles.HeaderListNav}>
                  Compare
                  <CompareHeaderNotification
                    comparison={this.props.comparison}
                    auth={this.props.auth}
                  />
                </NavLink>
              </li>
              <li className={styles.HeaderListItem}>
                <NavLink to="/cart" className={styles.HeaderListNav}>
                  Cart
                  <CartHeaderNotification cart={this.props.cart} />
                </NavLink>
              </li>
            </div>
            {this.renderContent()}
          </ul>
        </div>
        <Drawer
          open={this.state.open}
          handleClose={this.handleClose}
          handleToggle={this.handleToggle}
        />
      </nav>
    );
  }
}

const mapStateToProps = ({ auth, cart, comparison }) => {
  return { auth, cart, comparison };
};

export default connect(mapStateToProps, { logUserOut })(Header);
