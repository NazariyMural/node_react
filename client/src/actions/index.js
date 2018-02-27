import axios from "axios";
import {
  FETCH_USER,
  FETCH_DATA,
  TO_CART,
  GET_CART,
  INCREASE,
  DELETE,
  DECREASE
} from "./types";

export const fetchUser = () => {
  return dispatch => {
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
  };
};

export const fetchData = () => {
  return dispatch => {
    axios
      .get("/api/store")
      .then(res => {
        console.log(res, "dispatch Products Action");
        dispatch({ type: FETCH_DATA, payload: res.data });
      })
      .catch(err => console.log(err, "Action Phones Error"));
  };
};

export const putDataToCart = purchaseData => dispatch => {
  axios
    .post("/api/cart", { purchaseData })
    .then(res => {
      dispatch({ type: TO_CART, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const getCart = id => {
  return dispatch => {
    axios
      .get(`/api/cart/${id}`)
      .then(res => {
        dispatch({ type: GET_CART, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const increaseQuantity = increaseData => dispatch => {
  axios
    .post("/api/cart/increase", { increaseData })
    .then(res => {
      dispatch({ type: INCREASE, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const deleteFromCart = delData => dispatch => {
  axios
    .post("/api/cart/delete", { delData })
    .then(res => {
      dispatch({ type: DELETE, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const decreaseQuantity = decreaseData => dispatch => {
  axios
    .post("/api/cart/decrease", { decreaseData })
    .then(res => {
      dispatch({ type: DECREASE, payload: res.data });
    })
    .catch(err => console.log(err));
};
