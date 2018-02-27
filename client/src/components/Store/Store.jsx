import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData, putDataToCart } from "../../actions/index";
import map from "lodash/map";
import styles from "./Store.css";

class Store extends Component {
  componentDidMount() {
    this.props.fetchData();
  }
  renderProductsHandler = () => {
    let data = <p>Loading...</p>;
    if (!this.props.products) {
      return data;
    } else {
      let products = this.props.products;
      data = map(products, (product, key) => {
        return (
          <li key={product._id} className={styles.Prodoct_Item}>
            <span className={styles.Prodoct_Item_Desc}>{product.category}</span>
            <img
              src={product.img[0]}
              alt="product"
              className={styles.Prodoct_Item_Desc}
            />
            <span className={styles.Prodoct_Item_Desc}>{product.name}</span>
            <span className={styles.Prodoct_Item_Desc}>{product.price}</span>
            {map(product.comments, comment => {
              return (
                <ul key={comment}>
                  <li key={comment}>{comment}</li>
                </ul>
              );
            })}
            {this.props.auth ? (
              <a
                className="waves-effect waves-light btn"
                onClick={() =>
                  this.props.putDataToCart({
                    productID: product._id,
                    userID: this.props.auth.googleId
                    // name: product.name,
                    // photoURL: product.img[0],
                    // price: product.price
                  })
                }
              >
                Buy
              </a>
            ) : (
              <a className="waves-effect waves-light btn">Join us first</a>
            )}
          </li>
        );
      });
    }
    return data;
  };
  render() {
    // console.log(this.props.auth);
    return (
      <div>
        <div>Store</div>
        <ul>{this.renderProductsHandler()}</ul>
      </div>
    );
  }
}

const mapStateToProps = ({ products, auth }) => {
  return {
    products,
    auth
  };
};

export default connect(mapStateToProps, { fetchData, putDataToCart })(Store);
