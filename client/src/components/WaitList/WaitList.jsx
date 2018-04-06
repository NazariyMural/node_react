import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty, map } from "lodash";
import {
  addToWaitList,
  getWaitList,
  removeProduct,
  addToCartAndPemoveProduct
} from "../../actions/waitListActions";
import styles from "./WaitList.css";
import Product from "./Product/Product";
import { Link } from "react-router-dom";

class WaitList extends Component {
  //fetch data
  componentDidMount() {
    if (this.props.auth) {
      this.props.getWaitList(this.props.auth.googleId);
    }
  }

  addToCartHandler = ({ userID, productId, productName, productDescr }) => {
    const { addToCartAndPemoveProduct } = this.props;
    addToCartAndPemoveProduct({ userID, productName, productDescr, productId });
  };

  renderProduct = () => {
    const { waitList, auth, removeProduct } = this.props;
    if (auth) {
      if (waitList) {
        if (!isEmpty(waitList.userWaitList)) {
          return map(waitList.userWaitList, (product, key) => {
            return (
              <Product
                key={key}
                removeProduct={removeProduct}
                auth={auth}
                addToCartHandler={this.addToCartHandler}
                keys={key}
                product={product}
              />
            );
          });
        }
      }
      if (isEmpty(waitList) || isEmpty(waitList.userWaitList)) {
        return (
          <div className={styles.EmptyList}>
            <h4> You haven't any product on your wait list</h4>
            <Link to="/store" className="btn  green accent-4">
              Store
            </Link>
          </div>
        );
      }
    } else {
      return (
        <div className={styles.EmptyList}>
          <h4>Join us first</h4>
          <Link to="/login" className="btn blue darken-3">
            Join us
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div className={styles.Wrapper}>
        <section className={styles.WaitList}>{this.renderProduct()}</section>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, waitList, cart }) => {
  return { auth, waitList, cart };
};

export default connect(mapStateToProps, {
  addToWaitList,
  getWaitList,
  removeProduct,
  addToCartAndPemoveProduct
})(WaitList);
