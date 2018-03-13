import React, { Component } from "react";
import styles from "./PurchaseHistoryItems.css";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import { Redirect } from "react-router-dom";

const style = {
  TableStyle: {
    padding: "20px",
    borderLeft: "1px solid #D0D0D0",
    borderRight: "1px solid #D0D0D0",
    borderTop: "1px solid #D0D0D0"
  }
};

class PurchaseHistoryItems extends Component {
  state = {
    isClicked: false,
    currentPurchaseKey: null,
    currentPurchaseProducts: null,
    currentPurchasePrice: null,
    currentPurchaseDate: null
  };
  renderPurchaseHistory = () => {
    if (!isEmpty(this.props.purchaseHistory)) {
      return map(this.props.purchaseHistory, (item, key) => {
        return map(item, (purchase, key) => {
          return (
            <tr
              className={styles.TrItem}
              key={key}
              onClick={() =>
                this.getCurrentPurchaseHandler({
                  key: key,
                  products: purchase.products,
                  date: purchase.currentTime,
                  price: purchase.totalPrice
                })
              }
            >
              <td>{key}</td>
              <td>{purchase.currentTime}</td>
              <td>{purchase.totalPrice}</td>
            </tr>
          );
        });
      });
    }
    return null;
  };
  getCurrentPurchaseHandler = ({ key, products, price, date }) => {
    this.setState({
      isClicked: true,
      purchaseKey: key,
      currentPurchaseProducts: products,
      currentPurchasePrice: price,
      currentPurchaseDate: date
    });
  };
  render() {
    if (this.state.isClicked) {
      return (
        <Redirect
          to={{
            pathname: `/account/purchase/${this.state.purchaseKey}`,
            state: {
              products: this.state.currentPurchaseProducts,
              price: this.state.currentPurchasePrice,
              date: this.state.currentPurchaseDate
            }
          }}
        />
      );
    }
    return (
      <div>
        <h2>Purchase History</h2>
        <table className="striped bordered" style={style.TableStyle}>
          <thead style={{ padding: 20 }}>
            <tr>
              <th>№</th>
              <th>Date</th>
              <th>Sum</th>
            </tr>
          </thead>
          <tbody>{this.renderPurchaseHistory()}</tbody>
        </table>
      </div>
    );
  }
}

export default PurchaseHistoryItems;
