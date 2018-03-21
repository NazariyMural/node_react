// import React, { Component } from "react";
// import styles from "../Header.css";
// import { NavLink, Redirect } from "react-router-dom";
// import CartHeaderNotification from "../Notification/CartDataAmount/CartHeaderItem/CartHeaderItem";
// import CompareHeaderNotification from "../Notification/CompareHeaderNotification/CompareHeaderNotification";
// import HeaderItems from "./HeaderItems/HeaderItems";

// export const HeaderItems = ({cart, comparison, auth}) => {

//   renderContent = () => {
//     if (this.props.auth === false) {
//       return (
//         <li key="2" className={styles.HeaderListItem}>
//           <NavLink to="/login">Log In</NavLink>
//         </li>
//       );
//     } else if (this.props.auth) {
//       return (
//         <li key="1" className={styles.HeaderListItem}>
//           <NavLink to="/account">{this.props.auth.fullName}</NavLink>
//           <a href="/api/auth/logout" onClick={this.logOutClick}>
//             Logout
//           </a>
//         </li>
//       );
//     } else {
//       return (
//         <li>
//           <p href="/">Loading...</p>
//         </li>
//       );
//     }
//   };

//   render() {
//     return (
//       <nav className={styles.Header}>
//         <div className="nav-wrapper">
//           <NavLink
//             to={this.props.auth ? "/account" : "/login"}
//             className="left brand-logo"
//           >
//             Eliftech Market
//           </NavLink>

//           <ul className="right">
//             <li>
//               <NavLink to="/">Home</NavLink>
//             </li>
//             <li className={styles.HeaderListItem}>
//               <NavLink to="/compare" className={styles.HeaderListNav}>
//                 Compare
//                 <CompareHeaderNotification
//                   comparison={this.props.comparison}
//                   auth={this.props.auth}
//                 />
//               </NavLink>
//             </li>
//             <li className={styles.HeaderListItem}>
//               <NavLink to="/cart" className={styles.HeaderListNav}>
//                 Cart
//                 <CartHeaderNotification cart={this.props.cart} />
//               </NavLink>
//             </li>
//             {this.renderContent()}
//           </ul>
//         </div>
//       </nav>
//     );
//   }
// }

// export default HeaderItems;
