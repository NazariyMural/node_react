import React, { Component } from "react";
import styles from "./PurchaseHistoryItems.css";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import RaisedButton from "material-ui/RaisedButton";

class PurchaseHistoryItems extends Component {
  renderPurchaseHistory = () => {
    if (!isEmpty(this.props.purchaseHistory)) {
      return (
        <div className={styles.History}>
          <ul>
            {map(this.props.purchaseHistory, (item, key) => {
              return (
                <li key={key} className={styles.HistoryItem}>
                  <span>{item.item.name}</span>
                  <img
                    src={item.item.img[0]}
                    alt="history-img"
                    className={styles.HistoryImage}
                  />
                </li>
              );
            })}
          </ul>
          <RaisedButton
            onClick={this.props.cleanPurchaseHistory}
            label="Clear History"
            fullWidth={true}
          />
        </div>
      );
    }
    return <div>Some</div>;
  };
  render() {
    return (
      <div>
        <h2>User History</h2>
        <span>{this.renderPurchaseHistory()}</span>
      </div>
    );
  }
}

export default PurchaseHistoryItems;
