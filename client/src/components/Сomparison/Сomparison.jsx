// import React, { Component } from "react";
// import styles from "./Сomparison.css";
// import { connect } from "react-redux";
// import map from "lodash/map";
// import isEmpty from "lodash/isEmpty";
// import { getComparison } from "../../actions";

// // const style = {
// //   TableStyle: {
// //     borderLeft: "1px solid #D0D0D0",
// //     borderRight: "1px solid #D0D0D0",
// //     borderTop: "1px solid #D0D0D0"
// //   }
// // };

// class Comparison extends Component {
//   state = {
//     props: null,
//     products: null
//   };
//   componentWillMount() {
//     this.props.getComparison(this.props.auth.googleId);
//   }

//   renderData = () => {
//     const { auth, comparison } = this.props;
//     if (!auth) {
//       return <div>Join us</div>;
//     } else if (!isEmpty(comparison)) {
//       if (Object.keys(comparison.userCompare.items).length < 2) {
//         return <div>Add more products</div>;
//       }
//       const { userCompare } = this.props.comparison;
//       return (
//         <table className="striped bordered centered">
//           <thead>
//             <tr>
//               <th>Photo</th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Comments</th>
//               <th>Category</th>
//               <th>Weight</th>
//             </tr>
//           </thead>
//           <tbody>
//             {map(userCompare.items, (product, key) => {
//               console.log(product);
//               return (
//                 <tr key={product.item.name}>
//                   <td>
//                     <img
//                       src={product.item.img[0]}
//                       alt={product.item.img[0]}
//                       className={styles.TableImg}
//                     />
//                   </td>
//                   <td>{product.item.name}</td>
//                   <td>{product.item.price}</td>
//                   <td>
//                     {map(product.item.comments, comment => {
//                       return (
//                         <ul key={comment}>
//                           <li key={comment}>{comment}</li>
//                         </ul>
//                       );
//                     })}
//                   </td>
//                   <td>{product.item.category}</td>
//                   <td>{product.item.weight}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       );
//     } else {
//       return <div>Oppps, we got an error</div>;
//     }
//   };

//   render() {
//     return this.renderData();
//   }
// }

// const mapStateToProps = ({ comparison }) => {
//   return { comparison };
// };

// export default connect(mapStateToProps, { getComparison })(Comparison);

import React, { Component } from "react";
import styles from "./Сomparison.css";
import { connect } from "react-redux";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
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

  getProductsHandler = () => {
    const { userCompare } = this.props.comparison;
    return map(userCompare.items, (product, key) => {
      // return this.renderProductData(product.item);
      console.log(product.item);
      return (
        <tr style={{ display: "inline-flex", flexDirection: "column" }}>
          <tr>
            <td key={product.item.img[0]}>
              <img src={product.item.img[0]} alt="a" style={{ height: 150 }} />
            </td>
          </tr>
          <tr>
            <td key={product.item.name}>
              <span>{product.item.name}</span>
            </td>
          </tr>
          <tr>
            <td key={product.item.price}>
              <span>{product.item.price}</span>
            </td>
          </tr>
          <tr>
            <td key={product.item.category}>
              <span>{product.item.category}</span>
            </td>
          </tr>
          <tr>
            <td>
              {map(product.item.comments, comment => {
                return (
                  <ul key={comment}>
                    <li key={comment}>{comment}</li>
                  </ul>
                );
              })}
            </td>
          </tr>
          <tr>
            <td>
              <button
                onClick={() =>
                  this.props.deleteFromCompare({
                    productId: product.item._id,
                    userID: this.props.auth.googleId
                  })
                }
              >
                Delete from Comparison
              </button>
            </td>
          </tr>
        </tr>
      );
    });
  };

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
          <tbody>
            {this.renderProps()}
            {this.getProductsHandler()}
          </tbody>
        </table>
      );
    } else {
      return <div>Oppps, we got an error</div>;
    }
  };

  renderProductData = product => {
    return (
      <tr key={product.name} className={styles.ProductList}>
        <td key={product.img[0]}>
          <img src={product.img[0]} alt="a" style={{ height: 150 }} />
        </td>
        <td key={product.name}>
          <span>{product.name}</span>
        </td>
        <td key={product.price}>
          <span>{product.price}</span>
        </td>
        <td key={product.category}>
          <span>{product.category}</span>
        </td>
        <td>
          {map(product.comments, comment => {
            return (
              <ul key={comment} className={styles.TableList}>
                <li key={comment}>{comment}</li>
              </ul>
            );
          })}
        </td>
        <td key={product.category} />
      </tr>
    );
  };

  renderProps = () => {
    const props = this.getPropsHandler();
    console.log(props);
    return (
      <tr key={props.length} className={styles.ProductList}>
        {map(props, (prop, key) => {
          return <td key={key}>{prop}</td>;
        })}
      </tr>
    );
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
