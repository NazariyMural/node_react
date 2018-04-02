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

class WaitList extends Component {
  //fetch data
  componentDidMount() {
    if (this.props.auth) {
      this.props.getWaitList(this.props.auth.googleId);
    }
  }

  addToCartHandler = ({ userID, productId }) => {
    const { removeProduct, addToCart } = this.props;
    addToCart({ userID, productId })
      .then(data => {
        removeProduct({ userID, productId });
      })
      .catch(err => console.log(err));
  };

  renderProduct = () => {
    const btnClasses = ["waves-effect waves-light btn green accent-4"];
    const { waitList, auth } = this.props;
    if (waitList) {
      if (!isEmpty(waitList.userWaitList)) {
        return map(waitList.userWaitList, (product, key) => {
          return (
            <ul key={key} className={styles.SingleProduct}>
              <li>
                <img src={product.images} alt={product.images} />
              </li>
              <li>
                <h5>{product.name}</h5>
              </li>
              <li>
                <span>{product.descr}</span>
              </li>
              <li>
                <h6>Current price: ${product.price}</h6>
              </li>
              <li>
                {product.unavailable ? (
                  <a className="waves-effect waves-light btn green accent-4 disabled">
                    <i className="material-icons left">block</i>
                    Not Available
                  </a>
                ) : (
                  <a
                    className={btnClasses.join(" ")}
                    onClick={() =>
                      this.addToCartHandler({
                        productId: product._id,
                        userID: auth.googleId
                      })
                    }
                  >
                    <i className="material-icons left">shopping_cart</i>
                    Add to cart
                  </a>
                )}
              </li>
            </ul>
          );
        });
      }
    }
  };

  render() {
    return (
      <section className={styles.WaitList}>{this.renderProduct()}</section>
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
