import React from "react";
import styles from "./AddMoreProducts.css";
import { map } from "lodash";

export const AddMoreProducts = ({
  comparison,
  deleteFromCompare,
  googleId
}) => {
  let iconDel = [styles.DelComp, "material-icons"];
  return (
    <div className={styles.AddMoreProducts}>
      <h2>Add more products</h2>
      <h5>
        You have {Object.keys(comparison.userCompare.items).length} product
      </h5>
      {map(comparison.userCompare.items, (product, key) => {
        return (
          <div key={key} className={styles.SingleProduct}>
            <i
              className={iconDel.join(" ")}
              onClick={() =>
                deleteFromCompare({
                  productId: product.item._id,
                  userID: googleId
                })
              }
            >
              clear
            </i>
            <br />
            <img src={product.item.images} alt={product.item.images} />
            <h5>{product.item.name}</h5>
            <span>{product.item.descr}</span>
            <h6>Current price: ${product.item.price}</h6>
          </div>
        );
      })}
    </div>
  );
};
export default AddMoreProducts;
