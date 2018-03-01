import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData, addToCart, getCart } from "../../actions/index";
import map from "lodash/map";
import styles from "./Store.css";

class Store extends Component {
  componentDidMount() {
    this.props.fetchData();
  }
  renderProductsHandler = () => {
    let data = <p>Loading...</p>;
    if (!this.props.auth === null) {
      return data;
    } else if (this.props.auth === false) {
      let products = this.props.products;
      data = map(products, (product, key) => {
        return (
          <li key={product._id} className={styles.Prodoct_Item}>
            <span className={styles.Prodoct_Item_Desc}>{product.category}</span>
            <img
              src={product.img[0]}
              alt="product"
              className={styles.Prodoct_Item_Desc}
            />
            <span className={styles.Prodoct_Item_Desc}>{product.name}</span>
            <span className={styles.Prodoct_Item_Desc}>{product.price}</span>
            {map(product.comments, comment => {
              return (
                <ul key={comment}>
                  <li key={comment}>{comment}</li>
                </ul>
              );
            })}
            <a className="waves-effect waves-light btn">Join us first</a>
          </li>
        );
      });
    } else if (this.props.auth) {
      this.props.getCart(this.props.auth.googleId);
      let products = this.props.products;
      data = map(products, (product, key) => {
        return (
          <li key={product._id} className={styles.Prodoct_Item}>
            <span className={styles.Prodoct_Item_Desc}>{product.category}</span>
            <img
              src={product.img[0]}
              alt="product"
              className={styles.Prodoct_Item_Desc}
            />
            <span className={styles.Prodoct_Item_Desc}>{product.name}</span>
            <span className={styles.Prodoct_Item_Desc}>{product.price}</span>
            {map(product.comments, comment => {
              return (
                <ul key={comment}>
                  <li key={comment}>{comment}</li>
                </ul>
              );
            })}
            <a
              className="waves-effect waves-light btn"
              onClick={() =>
                this.props.addToCart({
                  productId: product._id,
                  userID: this.props.auth.googleId
                })
              }
            >
              Buy
            </a>
          </li>
        );
      });
    }
    return data;
  };
  render() {
    return (
      <div>
        <div>Store</div>
        <ul>{this.renderProductsHandler()}</ul>
      </div>
    );
  }
}

const mapStateToProps = ({ products, auth }) => {
  return {
    products,
    auth
  };
};

export default connect(mapStateToProps, { fetchData, addToCart, getCart })(
  Store
);
