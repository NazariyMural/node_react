import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { addToCompare } from "../../actions/compareActions";
import { addToWaitList, getWaitList } from "../../actions/waitListActions";
import { mainSearch } from "../../actions/mainSearchActions";
import { loadDataProduct } from "../../actions/getProductActions";
import { map, isEmpty } from "lodash";
import styles from "./Store.css";
import waitListStyles from "./ModalContentent/AddToWaitList.css";
import Product from "./Product/Product";
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
    const { auth, getWaitList } = this.props;
    if (auth) {
      getWaitList(this.props.auth.googleId);
    }
  }
  componentWillMount = () => {
    this.props.loadDataProduct();
  };

  //wait list modal handler
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  addToWaitListHandler = ({ userID, productId }) => {
    const { waitList, addToWaitList } = this.props;
    if (!isEmpty(waitList)) {
      const oldLen = waitList.userWaitList.length;
      addToWaitList({ userID, productId })
        .then(data => {
          console.log(oldLen);
          console.log(data.payload.userWaitList.length);
          if (data.payload.userWaitList.length > oldLen) {
            this.setState({ modalContent: "new_product" });
            this.handleOpenModal();
          } else {
            this.setState({ modalContent: "already_exist" });
          }
        })
        .catch(err => console.log(err));
    } else {
      addToWaitList({ userID, productId })
        .then(data => {
          this.setState({ modalContent: "new_product" });
          this.handleOpenModal();
        })
        .catch(err => console.log(err));
    }
  };
  //end

  //price was changed modal hendler
  handlePriceRender = (originalPrice, price) => {
    if (originalPrice > price) {
      return (
        <span className={styles.DiscountCont}>
          <span className={styles.OldPrice}>{`$${originalPrice}`}</span>
          <span className={styles.Discount}>{`$${price}`}</span>
        </span>
      );
    }
    return <span className={styles.Price}>{`$${price}`}</span>;
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
      let products = this.props.products.product;
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
            handlePriceRender={this.handlePriceRender}
          />
        );
      });
    }
    return data;
  };
  //end

  render() {
    const pages = [];
    if (this.props.products) {
      for (let i = 1; i <= this.props.products.pages; i++) {
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
        <div className={styles.Pagination}>
          <div>
            {pages &&
              pages.map((val, key) => (
                <button onClick={this.paginationHandler} key={key} id={val}>
                  {val}
                </button>
              ))}
          </div>
        </div>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className={waitListStyles.Modal}
          overlayClassName={waitListStyles.Overlay}
          ariaHideApp={false}
        >
          <ModalContent
            handleCloseModal={this.handleCloseModal}
            email={this.props.auth.email}
          />
        </ReactModal>
      </section>
    );
  }
}

const mapStateToProps = ({
  auth,
  products,
  activeTags,
  searchValue,
  waitList
}) => {
  return {
    auth,
    products,
    activeTags,
    searchValue,
    waitList
  };
};

export default connect(mapStateToProps, {
  addToCart,
  addToCompare,
  loadDataProduct,
  mainSearch,

  addToWaitList,
  getWaitList
})(Store);
