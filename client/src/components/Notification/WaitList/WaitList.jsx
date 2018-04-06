import React, { Component } from "react";
import styles from "./WaitList.css";
import _ from "lodash";

const badgeClasses = [styles.Badge];
badgeClasses.push("new badge");

class WaitList extends Component {
  renderBadge = () => {
    const { list, auth } = this.props;
    const ready = _.filter(
      list.userWaitList,
      (product, key) => product.unavailable === false
    );
    if (ready.length && auth) {
      return (
        <span
          data-badge-caption=""
          className={badgeClasses.join(" ")}
          id="badge"
          style={{ minWidth: 21, padding: 0, borderRadius: "50%" }}
        >
          {ready.length}
        </span>
      );
    }
    return null;
  };

  render() {
    return (
      <span className={styles.WaitList}>
        <i className="material-icons">access_time</i>
        {this.renderBadge()}
      </span>
    );
  }
}

export default WaitList;
