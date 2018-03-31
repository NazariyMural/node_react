import axios from "axios";
import { ADD_TO_WAITLIST, GET_WAITLIST } from "./types";

export const getWaitList = googleId => dispatch => {
  console.log("getWaitList", googleId);
  axios
    .get(`/api/wait-list/${googleId}`)
    .then(res => {
      dispatch({ type: GET_WAITLIST, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const addToWaitList = ({ userID, productId }) => dispatch => {
  axios
    .put("/api/wait-list/add", { userID, productId })
    .then(res => {
      dispatch({ type: ADD_TO_WAITLIST, payload: res.data });
    })
    .catch(err => console.log(err));
};
