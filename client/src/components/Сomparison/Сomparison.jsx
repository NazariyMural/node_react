import React, { Component } from "react";
// import styles from "./Comparison.css";
import { connect } from "react-redux";
// import { getCurrentComparision } from "../../actions";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import { getComparison } from "../../actions";

class Comparison extends Component {
  componentWillMount() {
    this.props.getComparison(this.props.auth.googleId);
  }

  renderComparisonData = () => {
    const { auth, comparison } = this.props;
    if (!auth) {
      return <div>Join us</div>;
    } else if (!isEmpty(comparison)) {
      return map(comparison.userCompare.items, (product, key) => {
        console.log(product, "product");
        console.log(key, "key");
      });
    } else {
      return <div>Add more products</div>;
    }
  };

  render() {
    return this.renderComparisonData();
  }
}

const mapStateToProps = ({ comparison }) => {
  return { comparison };
};

export default connect(mapStateToProps, { getComparison })(Comparison);
