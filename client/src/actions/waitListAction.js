import axios from "axios";
import { ADD_TO_WAITLIST, GET_WAITLIST, REMOVE_FROM_WAITLIST } from "./types";

export const getWaitList = googleId => dispatch => {
  return axios
    .get(`/api/wait-list/${googleId}`)
    .then(res => {
      dispatch({ type: GET_WAITLIST, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const addToWaitList = ({ userID, productId }) => dispatch => {
  return axios
    .put("/api/wait-list/add", { userID, productId })
    .then(res => {
      return dispatch({ type: ADD_TO_WAITLIST, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const removeProduct = ({ userID, productId }) => dispatch => {
  axios
    .delete(`/api/wait-list/remove/${userID}&${productId}`)
    .then(res => {
      dispatch({ type: REMOVE_FROM_WAITLIST, payload: res.data });
    })
    .catch(err => console.log(err));
};
