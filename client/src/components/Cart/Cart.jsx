import React, { Component } from "react";
import styles from "./Cart.css";
import { connect } from "react-redux";
import {
  getCart,
  fetchData,
  increaseQuantity,
  deleteFromCart,
  decreaseQuantity
} from "../../actions/index";
import _ from "lodash";

class Cart extends Component {
  componentDidMount() {
    this.props.fetchData();
    setTimeout(() => {
      this.props.getCart(this.props.user.googleId);
    }, 500);
  }
  renderUserPurchase = () => {
    if (!_.isEmpty(this.props.cart)) {
      let hash = {};
      const arrID = this.props.cart.productsID;
      arrID.forEach(id => {
        if (!hash[id]) hash[id] = 0;
        hash[id]++;
      });
      const filtered = this.props.products.filter(el => {
        if (hash[el._id]) {
          el["quantity"] = hash[el._id];
          return el;
        }
        return false;
      });
      return this.renderCart(filtered);
    }
  };

  renderCart = filtered => {
    return _.map(filtered, (el, key) => {
      return (
        <tr key={el._id}>
          <td>
            <img src={el.img[0]} alt="data" className={styles.CartImage} />
          </td>
          <td>{el.name}</td>
          <td>{el.price}</td>
          <td>{el.quantity}</td>
          <td>
            <span>
              <button
                onClick={() =>
                  this.props.deleteFromCart({
                    id: el._id,
                    userID: this.props.user.googleId
                  })
                }
              >
                del
              </button>
            </span>
          </td>
          <td>
            <span>
              <button
                onClick={() =>
                  this.props.increaseQuantity({
                    id: el._id,
                    userID: this.props.user.googleId
                  })
                }
              >
                +
              </button>
            </span>
          </td>
          <td>
            <span>
              <button
                onClick={() =>
                  this.props.decreaseQuantity({
                    id: el._id,
                    userID: this.props.user.googleId
                  })
                }
              >
                -
              </button>
            </span>
          </td>
        </tr>
      );
    });
  };

  // increaseProduct = id => {
  //   console.log(id);
  // };

  render() {
    return (
      <div className={styles.Cart}>
        <table className="striped bordered">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>{this.renderUserPurchase()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.auth,
    products: state.products
  };
};

export default connect(mapStateToProps, {
  getCart,
  fetchData,
  increaseQuantity,
  deleteFromCart,
  decreaseQuantity
})(Cart);
