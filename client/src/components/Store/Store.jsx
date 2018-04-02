import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchData,
  addToCart,
  addToCompare,
  getComparison
} from "../../actions";
import map from "lodash/map";
import { addToWaitList, getWaitList } from "../../actions/waitListAction";
import styles from "./Store.css";
import waitListStyles from "./ModalContentent/AddToWaitList.css";
import Product from "./Product/Product";

import { mainSearch } from "../../actions/mainSearch";
import { loadDataProduct } from "../../actions/getProduct";
import Tags from "../Filter/Tags/Tags";
import Search from "../Filter/Search/Search";
import ReactModal from "react-modal";
import ModalContent from "./ModalContentent/AddToWaitList";

class Store extends Component {
  state = {
    id: "",
    activeTags: null,
    showModal: false,
    modalContent: null
  };

  //fetch data
  componentDidMount() {
    if (this.props.auth) {
      this.props.getWaitList(this.props.auth.googleId);
    }
  }
  componentWillMount = () => {
    this.props.loadDataProduct();
  };
  //end

  //modal handler
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  addToWaitListHandler = ({ userID, productId }) => {
    const { waitList, addToWaitList } = this.props;
    const oldLen = waitList.userWaitList.length;
    addToWaitList({ userID, productId })
      .then(data => {
        console.log(data);
        console.log(oldLen);
        console.log(data.payload.userWaitList.length);
        if (data.payload.userWaitList.length > oldLen) {
          this.handleOpenModal();
        }
      })
      .catch(err => console.log(err));
  };
  //end

  //pagination
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
  //end

  //compare
  compareProductHandler = ({ productId, userID }) => {
    this.props.addToCompare({
      productId,
      userID
    });
  };
  //end

  //render product
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
            // addToWaitList={this.props.addToWaitList}
            addToWaitListHandler={this.addToWaitListHandler}
          />
        );
      });
    }
    return data;
  };
  //end

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

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className={waitListStyles.Modal}
          overlayClassName={waitListStyles.Overlay}
          ariaHideApp={false}
        >
          <ModalContent handleCloseModal={this.handleCloseModal} />
        </ReactModal>
      </section>
    );
  }
}

const mapStateToProps = ({
  products,
  auth,
  getAllProducts,
  activeTags,
  searchValue,
  waitList
}) => {
  return {
    products,
    auth,
    allProduct: getAllProducts,
    activeTags,
    searchValue,
    waitList
  };
};

export default connect(mapStateToProps, {
  fetchData,
  addToCart,
  addToCompare,
  getComparison,

  loadDataProduct,
  mainSearch,

  addToWaitList,
  getWaitList
})(Store);
