import React, { Component } from "react";
// import styles from "./Header.css";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="left brand-logo">
            Logo
          </a>
          <ul className="right">
            <li>
              <a href="/auth/google">Login with google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
