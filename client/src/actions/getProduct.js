import axios from "axios";

export const loadDataProduct = () => dispatch => {
  axios.get("/api/store/:id").then(response => {
    dispatch({
      type: "LOAD_ALL_PRODUCT",
      payload: response.data
    });
  });
};
