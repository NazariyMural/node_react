import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty, map } from "lodash";
import {
  addToWaitList,
  getWaitList,
  removeProduct
} from "../../actions/waitListAction";
import { addToCart } from "../../actions";
import styles from "./WaitList.css";
import Product from "./Product/Product";

class WaitList extends Component {
  //fetch data
  componentDidMount() {
    if (this.props.auth) {
      this.props.getWaitList(this.props.auth.googleId);
    }
  }

  addToCartHandler = ({ userID, productId, productName, productDescr }) => {
    const { removeProduct, addToCart } = this.props;
    addToCart({ userID, productId })
      .then(data => {
        removeProduct({ userID, productName, productDescr });
      })
      .catch(err => console.log(err));
  };

  renderProduct = () => {
    const { waitList, auth, removeProduct } = this.props;
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
        <h4 className={styles.EmptyList}>
          You haven't any product on your wait list
        </h4>
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
  addToCart,
  removeProduct
})(WaitList);
