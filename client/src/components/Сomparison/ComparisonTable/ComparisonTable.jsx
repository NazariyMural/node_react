import React from "react";
import styles from "./СomparisonTable.css";
import { isEmpty, map } from "lodash";

export const ComparisonTable = ({
  compareProducts,
  deleteFromCompare,
  googleId,
  addToCart
}) => {
  const ids = compareProducts._id;
  return (
    <div className={styles.TableWrapper}>
      <table className="bordered centered highlight">
        <tbody>
          {map(compareProducts, (product, key) => {
            return (
              <tr key={key}>
                <td className={styles.TableKey}>
                  {key === "_id" ? "Артикул" : key}
                </td>
                {map(product, (item, itemKey) => {
                  if (typeof item === "string" || typeof item === "number") {
                    if (typeof item === "string") {
                      if (item.includes("http")) {
                        return (
                          <td key={item}>
                            <img
                              src={item}
                              alt={item}
                              className={styles.TableImages}
                            />
                          </td>
                        );
                      } else if (ids.includes(item)) {
                        let iconDel = [styles.DelComp, "material-icons"];
                        let iconCart = [styles.Cart, "material-icons"];
                        return (
                          <td key={itemKey} className={styles.IconCont}>
                            <i
                              className={iconCart.join(" ")}
                              onClick={() => {
                                addToCart({
                                  productId: ids[itemKey],
                                  userID: googleId
                                });
                              }}
                            >
                              add_shopping_cart
                            </i>
                            <i
                              className={iconDel.join(" ")}
                              onClick={() =>
                                deleteFromCompare({
                                  productId: ids[itemKey],
                                  userID: googleId
                                })
                              }
                            >
                              clear
                            </i>
                            <span>{item}</span>
                          </td>
                        );
                      }
                    }
                    return <td key={itemKey}>{item}</td>;
                  } else if (!Array.isArray(item) && typeof item === "object") {
                    return (
                      <td key={itemKey}>
                        {map(item, (singlItem, itemKey) => {
                          return (
                            <ul key={singlItem + "" + itemKey}>
                              <li key={itemKey}>
                                {itemKey}: {singlItem}
                              </li>
                            </ul>
                          );
                        })}
                      </td>
                    );
                  } else if (Array.isArray(item)) {
                    if (!isEmpty(item)) {
                      return (
                        <td key={itemKey}>
                          {map(item, (arrData, arrKey) => {
                            return (
                              <span key={arrKey} className={styles.TableTags}>
                                {arrData}
                              </span>
                            );
                          })}
                        </td>
                      );
                    }
                  } else if (typeof item === "boolean") {
                    return <td key={itemKey}>{`${item}`}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
