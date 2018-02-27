import axios from "axios";
import { FETCH_USER, FETCH_DATA, TO_CART, GET_CART, INCREASE } from "./types";

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
        console.log(res, "dispatch Phones Action");
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
