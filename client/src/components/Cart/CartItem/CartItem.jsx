import React from "react";
import styles from "../Cart.css";

export default ({
  item,
  addToCart,
  auth,
  reduceByOne,
  deleteItem,
  handlePriceRender
}) => {
  return (
    <tr key={item.item._id}>
      <td>
        <img src={item.item.images} alt="data" className={styles.CartImage} />
      </td>
      <td className={styles.CartName} style={{width: 150}}>{item.item.name}</td>
      <td>
        {handlePriceRender(
          item.price,
          item.qty,
          item.item.originalPrice,
          item.item.price
        )}
      </td>
      <td>{item.qty}</td>
      <td className={styles.CartTdIconItem}>
        <span
          className={styles.CartIncrease}
          onClick={() =>
            addToCart({
              productId: item.item._id,
              userID: auth.googleId
            })
          }
        >
          <i className="material-icons">add_box</i>
        </span>
      </td>
      <td className={styles.CartTdIconItem}>
        <span
          className={styles.CartDecrease}
          onClick={() =>
            reduceByOne({
              productId: item.item._id,
              userID: auth.googleId
            })
          }
        >
          <i className="material-icons">indeterminate_check_box</i>
        </span>
      </td>
      <td className={styles.CartTdIconItem}>
        <span
          className={styles.CartDelete}
          onClick={() =>
            deleteItem({
              productId: item.item._id,
              userID: auth.googleId
            })
          }
        >
          <i className="material-icons">delete</i>
        </span>
      </td>
    </tr>
  );
};
