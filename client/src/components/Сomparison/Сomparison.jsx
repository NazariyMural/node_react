import React, { Component } from "react";
import styles from "./Comparison.css";
import { connect } from "react-redux";
import { forOwn, map } from "lodash";
import { getComparison, deleteFromCompare, addToCart } from "../../actions";
import ComparisonTable from "./ComparisonTable/ComparisonTable";
import AddMoreProducts from "./AddMoreProducts/AddMoreProducts";

class Comparison extends Component {
  state = {
    props: null,
    products: null
  };
  componentWillMount() {
    this.props.getComparison(this.props.auth.googleId);
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
        deleteFromCompare={this.props.deleteFromCompare}
        googleId={this.props.auth.googleId}
        addToCart={this.props.addToCart}
      />
    );
  };

  renderData = () => {
    const { auth, comparison } = this.props;
    if (!auth) {
      return <div>Join us</div>;
    } else if (comparison.userCompare) {
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
    } else {
      return (
        <div className={styles.AddMoreProducts}>
          <h2>You haven't add any products to compare</h2>
        </div>
      );
    }
  };

  render() {
    return this.renderData();
  }
}

const mapStateToProps = ({ comparison }) => {
  return { comparison };
};

export default connect(mapStateToProps, {
  getComparison,
  deleteFromCompare,
  addToCart
})(Comparison);
