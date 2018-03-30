import React from "react";
import map from "lodash/map";
import styles from "../Store.css";

export const Product = ({
  product,
  compareProductHandler,
  auth,
  addToCart,
  addToWaitList
}) => {
  const btnClasses = ["waves-effect waves-light btn green accent-4"];

  let buy_btn;
  if (auth && !product.unavailable) {
    btnClasses.push(styles.BtnBuy);
    buy_btn = (
      <a
        className={btnClasses.join(" ")}
        onClick={() =>
          addToCart({
            productId: product._id,
            userID: auth.googleId
          })
        }
      >
        <i className="material-icons left">shopping_cart</i>
        Add to cart
      </a>
    );
  } else if (auth && product.unavailable) {
    btnClasses.push(styles.BtnWait);
    buy_btn = (
      <a
        className={btnClasses.join(" ")}
        onClick={() =>
          addToWaitList({
            productId: product._id,
            userID: auth.googleId
          })
        }
      >
        <i class="material-icons">mail</i>
        Notify me, when be available
      </a>
    );
  } else {
    btnClasses.push(styles.BtnJoin);
    buy_btn = <a className={btnClasses.join(" ")}>Join us first</a>;
  }

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
      {map(product.comments, comment => {
        return (
          <ul key={comment}>
            <li key={comment}>{comment}</li>
          </ul>
        );
      })}
      <div className={styles.BtnContainer}>
        {buy_btn}

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
      </div>
    </li>
  );
};

export default Product;
