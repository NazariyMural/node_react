import React, { Component } from "react";
import styles from "./Comparison.css";
import { connect } from "react-redux";
import { forOwn, map, isEmpty } from "lodash";
import { getComparison, deleteFromCompare } from "../../actions/compareActions";
import { addToCart } from "../../actions/cartActions";
import ComparisonTable from "./ComparisonTable/ComparisonTable";
import AddMoreProducts from "./AddMoreProducts/AddMoreProducts";
import { Link } from "react-router-dom";

class Comparison extends Component {
  state = {
    props: null,
    products: null
  };

  componentDidMount() {
    if (this.props.auth) {
      this.props.getComparison(this.props.auth.googleId);
    }
  }

  getPropsHandler = () => {
    const { userCompare } = this.props.comparison;
    const props = map(userCompare.items, (product, key) => {
      return Object.keys(product.item);
    });
    return props.reduce((a, b) => (a.length > b.length ? a : b));
  };

  getProductsHandler = () => {
    const props = this.getPropsHandler();
    const final_obj = {};
    const { userCompare } = this.props.comparison;

    // set up each property as an empty array in the object
    props.forEach(item => {
      final_obj[item] = [];
    });

    // this iterates over every property in the object
    forOwn(userCompare.items, value => {
      props.forEach(item => {
        // just push the values undefined or no into each property array
        final_obj[item].push(value.item[item]);
      });
    });

    return final_obj;
  };

  addToCartHanlder = ({ userID, productId }) => {
    const { userCompare } = this.props.comparison;
    if (userCompare) {
      map(userCompare, (product, key) => {
        if (
          product[productId].item.active &&
          product[productId].item.available
        ) {
          this.props.addToCart({
            productId,
            userID
          });
        }
      });
    }
  };

  renderTableCompareHandler = () => {
    const { deleteFromCompare, auth } = this.props;
    const unodered = this.getProductsHandler();
    const compareProducts = {};
    Object.keys(unodered)
      .sort()
      .forEach(function(key) {
        compareProducts[key] = unodered[key];
      });

    delete compareProducts.__v;
    delete compareProducts.comments;
    delete compareProducts.available;
    return (
      <ComparisonTable
        compareProducts={compareProducts}
        deleteFromCompare={deleteFromCompare}
        googleId={auth.googleId}
        addToCart={this.addToCartHanlder}
      />
    );
  };

  renderData = () => {
    const { auth, comparison } = this.props;
    if (auth === false) {
      return (
        <div className={styles.Wrapper}>
          <section className={styles.Comparison}>
            <div className={styles.EmptyList}>
              <h4>Join us first</h4>
              <Link to="/login" className="btn blue darken-3">
                Join us
              </Link>
            </div>
          </section>
        </div>
      );
    } else if (isEmpty(comparison) || !comparison.userCompare) {
      return (
        <div className={styles.Wrapper}>
          <section className={styles.Comparison}>
            <div className={styles.EmptyList}>
              <h4> You haven't add any products to compare</h4>
              <Link to="/store" className="btn  green accent-4">
                Store
              </Link>
            </div>
          </section>
        </div>
      );
    } else if (!isEmpty(comparison) && comparison.userCompare) {
      if (Object.keys(comparison.userCompare.items).length < 2) {
        return (
          <div className={styles.Wrapper}>
            <section className={styles.Comparison}>
              <AddMoreProducts
                comparison={comparison}
                googleId={this.props.auth.googleId}
                deleteFromCompare={this.props.deleteFromCompare}
              />
            </section>
          </div>
        );
      }
      return this.renderTableCompareHandler();
    }
  };
  render() {
    return this.renderData();
  }
}

const mapStateToProps = ({ comparison, auth }) => {
  return { comparison, auth };
};

export default connect(mapStateToProps, {
  getComparison,
  deleteFromCompare,
  addToCart
})(Comparison);
