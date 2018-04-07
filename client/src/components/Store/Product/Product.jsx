import React from "react";
import map from "lodash/map";
import styles from "../Store.css";
import { Link } from "react-router-dom";

export const Product = ({
  product,
  compareProductHandler,
  auth,
  addToCart,
  addToWaitListHandler,
  handlePriceRender
}) => {
  const btnClasses = ["waves-effect waves-light btn green accent-4"];

  let buy_btn;
  if (auth && !product.active) {
    btnClasses.push(styles.BtnOver);
    btnClasses.push("disabled");
    buy_btn = (
      <a className={btnClasses.join(" ")}>
        <i className="material-icons">remove_shopping_cart</i>
        <span>Product is over</span>
      </a>
    );
  } else if (auth && !product.available) {
    btnClasses.push(styles.BtnWait);
    buy_btn = (
      <a
        className={btnClasses.join(" ")}
        onClick={() =>
          addToWaitListHandler({
            userID: auth.googleId,
            productId: product._id
          })
        }
      >
        <i className="material-icons">mail</i>
        <span>
          Notify when be<br /> available
        </span>
      </a>
    );
  } else if (auth && product.available) {
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
  } else {
    btnClasses.push(styles.BtnJoin);
    buy_btn = (
      <Link to="/login" className={btnClasses.join(" ")}>
        Join us first
      </Link>
    );
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
      <span className={styles.Price}>
        {handlePriceRender(product.originalPrice, product.price)}
      </span>
      <div className={styles.Descr}>
        <div className={styles.Descr_In}>
          <p>{product.descr}</p>
        </div>
      </div>
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
