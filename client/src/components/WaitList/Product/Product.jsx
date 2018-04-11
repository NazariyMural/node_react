import React from "react";
import styles from "../WaitList.css";

export default ({ removeProduct, auth, keys, addToCartHandler, product }) => {
  let btnClasses = ["waves-effect waves-light btn green accent-4"];
  let btnClassesDisable = ["waves-effect waves-light btn disabled"];
  btnClassesDisable.push(styles.DisabledBtn);
  return (
    <ul key={keys} className={styles.SingleProduct}>
      <li className={styles.RemoveIcon}>
        <i
          className="material-icons"
          onClick={() => {
            removeProduct({
              productName: product.name,
              productDescr: product.descr,
              userID: auth.googleId
            });
          }}
        >
          close
        </i>
      </li>
      <li>
        <img src={product.images} alt={product.images} />
      </li>
      <li>
        <h5 className={styles.Name}>{product.name}</h5>
      </li>
      <li>
        <span>{product.descr.slice(0, 20)}...</span>
      </li>
      <li>
        <h6>Current price: ${product.price}</h6>
      </li>
      <li>
        {!product.available ? (
          <a className={btnClassesDisable.join(" ")}>
            <i className="material-icons left">block</i>
            Not Available
          </a>
        ) : (
          <a
            className={btnClasses.join(" ")}
            onClick={() =>
              addToCartHandler({
                productId: product._id,
                productName: product.name,
                productDescr: product.descr,
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
};
