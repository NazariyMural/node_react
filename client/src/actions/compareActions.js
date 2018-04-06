import axios from "axios";
import {
  ADD_TO_COMPARE,
  GET_COMPARISON,
  DELETE_ITEM_FROM_COMPARE
} from "./types";

export const getComparison = userID => dispatch => {
  axios
    .get(`/api/compare/${userID}`)
    .then(res => {
      dispatch({ type: GET_COMPARISON, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const addToCompare = addToCompareData => dispatch => {
  axios
    .post("/api/compare/add-to-compare", {
      productId: addToCompareData.productId,
      userID: addToCompareData.userID
    })
    .then(res => {
      dispatch({ type: ADD_TO_COMPARE, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const deleteFromCompare = deleteItemData => dispatch => {
  axios
    .post("/api/compare/delete-item", {
      productId: deleteItemData.productId,
      userID: deleteItemData.userID
    })
    .then(res => {
      dispatch({ type: DELETE_ITEM_FROM_COMPARE, payload: res.data });
    })
    .catch(err => console.log(err));
};
