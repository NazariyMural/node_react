import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchData,
  addToCart,
  addToCompare,
  getComparison
} from "../../actions";
import map from "lodash/map";
import styles from "./Store.css";
import Product from "./Product/Product";

class Store extends Component {
  componentDidMount() {
    this.props.fetchData();
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
        return (
          <Product
            key={product._id}
            product={product}
            compareProductHandler={this.compareProductHandler}
            auth={this.props.auth}
            addToCart={this.props.addToCart}
          />
        );
      });
    }
    return data;
  };
  render() {
    return (
      <section className={styles.StoreWrapper}>
        <div className="container">
          <div>Store</div>
          <ul>{this.renderProductsHandler()}</ul>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ products, auth }) => {
  return {
    products,
    auth
  };
};

export default connect(mapStateToProps, {
  fetchData,
  addToCart,
  addToCompare,
  getComparison
})(Store);
