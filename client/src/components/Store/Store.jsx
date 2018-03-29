import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchData,
  addToCart,
  addToCompare,
  getComparison
} from "../../actions";
import map from "lodash/map";
import styles from "./Store.css";
import Product from "./Product/Product";

import { mainSearch } from "../../actions/mainSearch";
import { loadDataProduct } from "../../actions/getProduct";
import Tags from "../Filter/Tags/Tags";
import Search from "../Filter/Search/Search";

class Store extends Component {
  state = {
    id: "",
    activeTags: null
  };
  // componentDidMount() {
  //   this.props.fetchData();
  // }

  componentWillMount = () => {
    this.props.loadDataProduct();
  };

  paginationHandler = event => {
    const { activeTags, searchValue } = this.props;
    const tags = map(activeTags, tag => tag);
    // const searchArr = map(searchValue, value => value);
    this.setState({
      id: event.target.id
    });
    this.props.mainSearch(
      event.target.id,
      // searchArr.join(""),
      searchValue,
      tags.join(" ")
    );
  };

  compareProductHandler = ({ productId, userID }) => {
    this.props.addToCompare({
      productId,
      userID
    });
  };
  renderProductsHandler = () => {
    let data = <p>Loading...</p>;
    if (!this.props.auth === null) {
      return data;
    } else {
      let products = this.props.allProduct.product;
      data = map(products, (product, key) => {
        return (
          <Product
            key={product._id}
            product={product}
            compareProductHandler={this.compareProductHandler}
            auth={this.props.auth}
            addToCart={this.props.addToCart}
          />
        );
      });
    }
    return data;
  };
  render() {
    const pages = [];
    if (this.props.allProduct) {
      for (let i = 0; i < this.props.allProduct.pages; i++) {
        pages.push(i);
      }
    }
    return (
      <section className={styles.StoreWrapper}>
        <div className={styles.SearchContainer}>
          <Search currentPage={this.state.id} />
        </div>
        <div className={styles.Products}>
          <ul>{this.renderProductsHandler()}</ul>
        </div>
        <section className={styles.Tags}>
          <Tags currentPage={this.state.id} />
        </section>
        <div className="paginationBox">
          {pages &&
            pages.map((val, key) => (
              <button onClick={this.paginationHandler} key={key} id={val}>
                {val}
              </button>
            ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({
  products,
  auth,
  getAllProducts,
  activeTags,
  searchValue
}) => {
  return {
    products,
    auth,
    allProduct: getAllProducts,
    activeTags,
    searchValue
  };
};

export default connect(mapStateToProps, {
  fetchData,
  addToCart,
  addToCompare,
  getComparison,

  loadDataProduct,
  mainSearch
})(Store);
