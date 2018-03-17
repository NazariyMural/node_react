import React, { Component } from "react";
import styles from "./Сomparison.css";
import { connect } from "react-redux";
import { isEmpty, forOwn, map } from "lodash";
import { getComparison, deleteFromCompare } from "../../actions";

// const style = {
//   TableStyle: {
//     borderLeft: "1px solid #D0D0D0",
//     borderRight: "1px solid #D0D0D0",
//     borderTop: "1px solid #D0D0D0"
//   }
// };

class Comparison extends Component {
  state = {
    props: null,
    products: null
  };
  componentWillMount() {
    this.props.getComparison(this.props.auth.googleId);
  }

  getProps = () => {
    const { userCompare } = this.props.comparison;
    return map(userCompare.items, (product, key) => {
      return Object.keys(product.item);
    });
  };
  getPropsHandler = () => {
    const props = this.getProps();
    return props[0];
  };

  getProductsHandler = () => {
    const props = this.getPropsHandler();
    const final_obj = {};
    const { userCompare } = this.props.comparison;

    // set up each property as an empty array in the object
    props.forEach(item => {
      final_obj[item] = [];
    });

    // this iterates over every property in the object
    forOwn(userCompare.items, value => {
      props.forEach(item => {
        // just push the values undefined or no into each property array
        final_obj[item].push(value.item[item]);
      });
    });
    return final_obj;
  };

  renderTableRowHandler = () => {
    const compareProducts = this.getProductsHandler();
    delete compareProducts.__v;
    delete compareProducts.comments;

    console.log(compareProducts);
    return map(compareProducts, (product, key) => {
      return (
        <tr key={key}>
          <td>{key}</td>
          {map(product, (item, itemKey) => {
            if (!item) {
              return <td key={itemKey}>----</td>;
            } else if (typeof item === "string" || typeof item === "number") {
              if (typeof item === "string") {
                if (item.includes("http")) {
                  return (
                    <td key={item}>
                      <button
                        className="btn grey lighten-5 center black-text"
                        onClick={() =>
                          this.props.deleteFromCompare({
                            productId: compareProducts._id,
                            userID: this.props.auth.googleId
                          })
                        }
                      >
                        <i className="material-icons">clear</i>
                      </button>
                      <br />
                      <img
                        src={item}
                        alt={item}
                        className={styles.TableImages}
                      />
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
            }
          })}
        </tr>
      );
    });
  };

  renderData = () => {
    const { auth, comparison } = this.props;
    if (!auth) {
      return <div>Join us</div>;
    } else if (!isEmpty(comparison)) {
      if (Object.keys(comparison.userCompare.items).length < 2) {
        return <div>Add more products</div>;
      }
      return (
        <table className="striped bordered centered">
          <tbody>{this.renderTableRowHandler()}</tbody>
        </table>
      );
    } else {
      return <div>Oppps, we got an error</div>;
    }
  };

  render() {
    return this.renderData();
  }
}

const mapStateToProps = ({ comparison }) => {
  return { comparison };
};

export default connect(mapStateToProps, { getComparison, deleteFromCompare })(
  Comparison
);

// renderProductName = () => {
//   const nameObj = {};
//   const names = [];
//   const { userCompare } = this.props.comparison;
//   // console.log(userCompare);
//   const props = this.getPropsHandler();
//   // console.log(props);
//   map(userCompare.items, (product, key) => {
//     // return this.renderProductData(product.item);
//     map(product.item, (item, prop) => {
//       if (props.includes(prop)) {
//         // console.log(`${prop}: ${item}`);
//         if (prop === "name") {
//           names.push(item);
//           nameObj[prop] = names;
//         }
//       }
//     });
//   });
//   // console.log(nameObj);
//   // console.log(names);
//   // return map(nameObj, (name, key) => {
//   //   return (
//   //     <tr>
//   //       <td>{key}</td>
//   //       {map(name, itemName => <td>{itemName}</td>)}
//   //     </tr>
//   //   );
//   // });
// };

// renderProductName2 = () => {
//   // const category = [];

//   const final_obj = {};
//   const nameObj = {};
//   //   names = [],
//   //   weights = [],
//   //   prices = [],
//   //   comments = [],
//   //   photos = [],
//   //   propsArr = [],
//   //   tags = [],
//   //   availability = [],
//   //   desctiptions = [];
//   const props = this.getPropsHandler();
//   // console.log(props);
//   // let len = props.length;
//   const { userCompare } = this.props.comparison;
//   map(userCompare.items, (obj, key) => {
//     console.log(obj);
//     const result = Object.values(obj).reduce((r, e) => {
//       props.forEach(prop => {
//         if (!r[prop]) r[prop] = [];
//         r[prop].push(e.item[prop] ? e.item[prop] : null);
//       });
//       return r;
//     }, {});

//     console.log(result);

//     // props.forEach(item => {
//     //   final_obj[item] = [];
//     // });

//     // // this iterates over every property in the object
//     // forOwn(obj, value => {
//     //   props.forEach(item => {
//     //     // just push the values undefined or no into each property array
//     //     final_obj[item].push(value.item[item]);
//     //   });
//     // });
//     // console.log(final_obj);

//     // category.push(product.item.category);
//     // return map(product.item, (item, prop) => {
//     // while (len) {
//     //   let temp = props.shift();
//     //   let tempData = [];
//     //   if (product.item.hasOwnProperty([temp])) {
//     //     tempData.push(product.item[temp]);
//     //   } else {
//     //     tempData.push("---");
//     //   }
//     //   nameObj[temp] = tempData;
//     //   len--;
//     // }

//     // switch (prop) {
//     //   case "name":
//     //     names.push(item);
//     //     nameObj[prop] = names;
//     //     break;
//     //   case "comments":
//     //     comments.push(item);
//     //     nameObj[prop] = comments;
//     //     break;
//     //   case "images":
//     //     photos.push(item);
//     //     nameObj[prop] = photos;
//     //     break;
//     //   case "price":
//     //     prices.push(item);
//     //     nameObj[prop] = prices;
//     //     break;
//     //   case "weight":
//     //     weights.push(item);
//     //     nameObj[prop] = weights;
//     //     break;
//     //   case "props":
//     //     propsArr.push(item);
//     //     nameObj[prop] = propsArr;
//     //     break;
//     //   case "tags":
//     //     tags.push(item);
//     //     nameObj[prop] = tags;
//     //     break;
//     //   case "active":
//     //     availability.push(item);
//     //     nameObj[prop] = availability;
//     //     break;
//     //   case "descr":
//     //     desctiptions.push(item);
//     //     nameObj[prop] = desctiptions;
//     //     break;
//     //   default:
//     //     break;
//     // }
//     // });
//   });
//   console.log(nameObj);
// };

// getProductsHandler = () => {
//   const { userCompare } = this.props.comparison;
//   return map(userCompare.items, (product, key) => {
//     // return this.renderProductData(product.item);
//     // console.log(product.item);
//     return (
//       <tr style={{ display: "inline-flex", flexDirection: "column" }}>
//         <tr>
//           <td key={product.item.img[0]}>
//             <img src={product.item.img[0]} alt="a" style={{ height: 150 }} />
//           </td>
//         </tr>
//         <tr>
//           <td key={product.item.name}>
//             <span>{product.item.name}</span>
//           </td>
//         </tr>
//         <tr>
//           <td key={product.item.price}>
//             <span>{product.item.price}</span>
//           </td>
//         </tr>
//         <tr>
//           <td key={product.item.category}>
//             <span>{product.item.category}</span>
//           </td>
//         </tr>
//         <tr>
//           <td>
//             {map(product.item.comments, comment => {
//               return (
//                 <ul key={comment}>
//                   <li key={comment}>{comment}</li>
//                 </ul>
//               );
//             })}
//           </td>
//         </tr>
//         <tr>
//           <td>
//             <button
//               onClick={() =>
//                 this.props.deleteFromCompare({
//                   productId: product.item._id,
//                   userID: this.props.auth.googleId
//                 })
//               }
//             >
//               Delete from Comparison
//             </button>
//           </td>
//         </tr>
//       </tr>
//     );
//   });
// };
