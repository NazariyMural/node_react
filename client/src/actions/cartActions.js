import axios from "axios";
import {
  GET_CART,
  DELETE_ITEM,
  REDUCE,
  ADD_TO_CART,
  REMOVE_CART,
  ADD_TO_PURCHASE_HISTORY,
  CHECK_PRICE,
  SEND_TO_DELIVERY
} from "./types";

import map from "lodash/map";

export const getCart = userID => {
  return dispatch => {
    axios
      .get(`/api/cart/${userID}`)
      .then(res => {
        dispatch({ type: GET_CART, payload: res.data });
      })
      .catch(err => err);
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
      .catch(err => err);
  };
};

export const addToCart = addToCartData => {
  return dispatch => {
    axios
      .post("/api/cart/add-to-cart", {
        productId: addToCartData.productId,
        userID: addToCartData.userID
      })
      .then(res => {
        dispatch({ type: ADD_TO_CART, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const reduceByOne = reduceByOneData => {
  return dispatch => {
    axios
      .post("/api/cart/reduce-by-one", {
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
      .post("/api/cart/delete-item", {
        productId: deleteItemData.productId,
        userID: deleteItemData.userID
      })
      .then(res => {
        dispatch({ type: DELETE_ITEM, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const handlePurchaseSubmit = ({ products, userID, totalPrice }) => {
  return dispatch => {
    axios
      .post("/api/cart/add-to-purchase-history", {
        products,
        userID,
        totalPrice
      })
      .then(res => {
        dispatch({ type: ADD_TO_PURCHASE_HISTORY, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const checkPrice = auth => {
  return dispatch => {
    return axios
      .get(`/api/cart/check-price/${auth}`)
      .then(res => {
        console.log(res.data);
        dispatch({ type: CHECK_PRICE, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const handleDeliverySubmit = ({ products, auth }) => {
  console.log(auth);
  const items = [];
  map(products, (item, key) => {
    items.push({ name: item.item.name });
  });
  const data = {
    arrival_point: auth.location.geometry.location,
    email: auth.email,
    items: items
  };
  return dispatch => {
    fetch("https://delivery-service08.herokuapp.com/api/orders", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    });
    // axios
    //   .post("https://delivery-service08.herokuapp.com/api/orders", { data })
    //   .then(res => {
    //     console.log(res.data);
    //     dispatch({ type: SEND_TO_DELIVERY, payload: res.data });
    //   })
    //   .catch(err => console.log(err));
  };
};
