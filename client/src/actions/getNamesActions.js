import axios from "axios";
import { GET_PRODUCT_NAMES } from "./types";
export const getNames = () => dispatch => {
  axios
    .get("/api/store/get-names")
    .then(response => {
      dispatch({
        type: GET_PRODUCT_NAMES,
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};
