import React, { Component } from "react";
import styles from "./Comparison.css";
import { connect } from "react-redux";
import { forOwn, map, isEmpty } from "lodash";
import { getComparison, deleteFromCompare, addToCart } from "../../actions";
import ComparisonTable from "./ComparisonTable/ComparisonTable";
import AddMoreProducts from "./AddMoreProducts/AddMoreProducts";
import { NavLink } from "react-router-dom";

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
    return map(userCompare.items, (product, key) => {
      return Object.keys(product.item);
    })[0];
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

  renderTableCompareHandler = () => {
    const { deleteFromCompare, auth, addToCart } = this.props;
    const unodered = this.getProductsHandler();
    const compareProducts = {};
    Object.keys(unodered)
      .sort()
      .forEach(function(key) {
        compareProducts[key] = unodered[key];
      });

    delete compareProducts.__v;
    delete compareProducts.comments;
    return (
      <ComparisonTable
        compareProducts={compareProducts}
        deleteFromCompare={deleteFromCompare}
        googleId={auth.googleId}
        addToCart={addToCart}
      />
    );
  };

  renderData = () => {
    const { auth, comparison } = this.props;
    if (auth === false) {
      return (
        <div className={styles.AddMoreProducts}>
          <h2>You have not LogIn yet!</h2>
          <h2>Join us first</h2>
          <NavLink to={"/login"}>Log In</NavLink>
        </div>
      );
    } else if (isEmpty(comparison) || !comparison.userCompare) {
      return (
        <div className={styles.AddMoreProducts}>
          <h2>You haven't add any products to compare</h2>
        </div>
      );
    } else if (!isEmpty(comparison) && comparison.userCompare) {
      if (Object.keys(comparison.userCompare.items).length < 2) {
        return (
          <AddMoreProducts
            comparison={comparison}
            googleId={this.props.auth.googleId}
            deleteFromCompare={this.props.deleteFromCompare}
          />
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
