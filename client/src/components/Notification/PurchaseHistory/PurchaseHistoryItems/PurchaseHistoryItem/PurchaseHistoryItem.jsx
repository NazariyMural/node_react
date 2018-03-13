import React from "react";
import styles from "./PurchaseHistoryItem.css";
import map from "lodash/map";
// import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";

const style = {
  TableStyle: {
    borderLeft: "1px solid #D0D0D0",
    borderRight: "1px solid #D0D0D0",
    borderTop: "1px solid #D0D0D0"
  }
};

const PurchaseHistoryItem = props => {
  return (
    <div>
      <h2>Your purchase details by {props.location.state.date}</h2>

      <div className="container">
        <table className="striped bordered centered" style={style.TableStyle}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody className={styles.Tbody}>
            {map(props.location.state.products, (product, key) => {
              return (
                <tr key={key}>
                  <td>{product.item.name}</td>
                  <td>{product.price}</td>
                  <td>{product.qty}</td>
                  <td>
                    <img src={product.item.img[0]} alt={product.item.name} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h4 className={styles.Price}>
        Current purchase price: ${props.location.state.price}
      </h4>
      <div className={styles.NavLinks}>
        <Link to="/account" className="btn blue darken-1">
          Go Back
        </Link>
        <Link to="/" className="btn blue darken-4">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default PurchaseHistoryItem;
