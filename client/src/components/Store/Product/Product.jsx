import React from "react";
import map from "lodash/map";
import styles from "../Store.css";

export const Product = ({
  product,
  compareProductHandler,
  auth,
  addToCart
}) => {
  return (
    <li key={product._id} className={styles.Prodoct_Item}>
      <span>{product.category}</span>
      <img
        src={product.images}
        alt="product"
        className={styles.Product_Image}
      />
      <span>{product.name}</span>
      <span>${product.price}</span>
      <span>{!product.active ? "Product is over" : "Good descriptions"}</span>
      <span className={styles.CompareContainer}>
        <img
          className={styles.CompareItem}
          src="https://cdn4.iconfinder.com/data/icons/banking-and-finance/500/finance-scale-128.png"
          alt="compare"
          onClick={() =>
            compareProductHandler({
              productId: product._id,
              userID: auth.googleId
            })
          }
        />
      </span>
      {map(product.comments, comment => {
        return (
          <ul key={comment}>
            <li key={comment}>{comment}</li>
          </ul>
        );
      })}
      {!auth ? (
        <a className="waves-effect waves-light btn">Join us first</a>
      ) : (
        <a
          className="waves-effect waves-light btn"
          onClick={() =>
            addToCart({
              productId: product._id,
              userID: auth.googleId
            })
          }
        >
          Buy
        </a>
      )}
    </li>
  );
};

export default Product;
