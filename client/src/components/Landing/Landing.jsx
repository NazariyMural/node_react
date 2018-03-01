import React, { Component } from "react";
import styles from "./Landing.css";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    return <div className={styles.Landing}>Landing</div>;
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Landing);
