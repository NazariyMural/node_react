import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchData,
  addToCart,
  getCart,
  addToCompare,
  getComparison
} from "../../actions";
import map from "lodash/map";
import styles from "./Store.css";

class Store extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      this.props.getComparison(nextProps.auth.googleId);
    } else {
      this.props.getComparison();
    }
  }

  compareProductHandler = ({ productId, userID }) => {
    this.props.addToCompare({
      productId,
      userID
    });
  };
  renderProductsHandler = () => {
    let data = <p>Loading...</p>;
    if (!this.props.auth === null) {
      return data;
    } else {
      let products = this.props.products;
      data = map(products, (product, key) => {
        console.log(product.active);
        return (
          <li key={product._id} className={styles.Prodoct_Item}>
            <span>{product.category}</span>
            <img
              src={product.images}
              alt="product"
              className={styles.Product_Image}
            />
            <span>{product.name}</span>
            <span>${product.price}</span>
            <span>{!product.active ? "Product is over" : null}</span>
            <span className={styles.CompareContainer}>
              <img
                className={styles.CompareItem}
                src="https://cdn4.iconfinder.com/data/icons/banking-and-finance/500/finance-scale-128.png"
                alt="compare"
                onClick={() =>
                  this.compareProductHandler({
                    productId: product._id,
                    userID: this.props.auth.googleId
                  })
                }
              />
            </span>
            {map(product.comments, comment => {
              return (
                <ul key={comment}>
                  <li key={comment}>{comment}</li>
                </ul>
              );
            })}
            {!this.props.auth ? (
              <a className="waves-effect waves-light btn">Join us first</a>
            ) : (
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
            )}
          </li>
        );
      });
    }
    return data;
  };
  render() {
    return (
      <div className="container">
        <div>Store</div>
        <ul>{this.renderProductsHandler()}</ul>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  };
};

export default connect(mapStateToProps, {
  fetchData,
  addToCart,
  getCart,
  addToCompare,
  getComparison
})(Store);
