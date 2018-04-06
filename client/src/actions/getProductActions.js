import axios from "axios";
import { LOAD_ALL_PRODUCT } from "./types";

export const loadDataProduct = () => dispatch => {
  axios.get("/api/store/:id").then(response => {
    dispatch({
      type: LOAD_ALL_PRODUCT,
      payload: response.data
    });
  });
};
