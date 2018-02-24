import React, { Component } from "react";
import styles from "./Landing.css";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Landing extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className={styles.Landing}>
        <p>Landing</p>
      </div>
    );
  }
}

export default connect(null, actions)(Landing);
