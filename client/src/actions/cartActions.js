import axios from "axios";
import {
  GET_CART,
  DELETE_ITEM,
  REDUCE,
  ADD_TO_CART,
  REMOVE_CART,
  ADD_TO_PURCHASE_HISTORY,
  CHECK_PRICE
  // SEND_TO_DELIVERY
} from "./types";

import map from "lodash/map";
import { decrementProgress, incrementProgress } from "./progress";

export const getCart = userID => {
  return dispatch => {
    axios
      .get(`/api/cart/${userID}`)
      .then(res => {
        dispatch({ type: GET_CART, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const removeCart = userID => {
  return dispatch => {
    axios
      .get(`/api/cart/remove-cart/${userID}`)
      .then(res => {
        console.log(res.data);
        dispatch({ type: REMOVE_CART, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const addToCart = addToCartData => {
  return dispatch => {
    return axios
      .post("/api/cart/add-to-cart", {
        productId: addToCartData.productId,
        userID: addToCartData.userID
      })
      .then(res => {
        return dispatch({ type: ADD_TO_CART, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const reduceByOne = reduceByOneData => {
  return dispatch => {
    axios
      .put("/api/cart/reduce-by-one", {
        productId: reduceByOneData.productId,
        userID: reduceByOneData.userID
      })
      .then(res => {
        dispatch({ type: REDUCE, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const deleteItem = deleteItemData => {
  return dispatch => {
    axios
      .delete(
        `/api/cart/delete-item/${deleteItemData.productId}&${
          deleteItemData.userID
        }`
      )
      .then(res => {
        dispatch({ type: DELETE_ITEM, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const checkPrice = auth => {
  return dispatch => {
    return axios
      .get(`/api/cart/check-price/${auth}`)
      .then(res => {
        dispatch({ type: CHECK_PRICE, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const handlePurchaseSubmit = ({
  products,
  userID,
  totalPrice,
  link
}) => {
  return dispatch => {
    return axios
      .post("/api/cart/add-to-purchase-history", {
        products,
        userID,
        totalPrice,
        link
      })
      .then(res => {
        dispatch({ type: ADD_TO_PURCHASE_HISTORY, payload: res.data.result });
        return res.data;
      })
      .catch(err => console.log(err));
  };
};

export const handleDeliverySubmit = ({
  products,
  auth,
  userID,
  totalPrice,
  link
}) => {
  const items = [];
  map(products, (item, key) => {
    items.push({ name: item.item.name });
  });
  const data = {
    arrivalPoint: auth.location.geometry.location,
    email: auth.email,
    items: items
  };
  return dispatch => {
    dispatch(incrementProgress());
    return new Promise((resolve, reject) => {
      axios
        .post("https://delivery-service08.herokuapp.com/api/orders", data)
        .then(res => {
          dispatch(
            handlePurchaseSubmit({
              products,
              userID,
              totalPrice,
              // link: "http://delivery-service08.herokuapp.com/api/orders"
              link: res.data.trackCode
            })
          )
            .then(data => {
              dispatch(decrementProgress());
              resolve(data);
            })
            .catch(err => reject(err));
        });
    }).catch(err => console.log(err));
  };
};
