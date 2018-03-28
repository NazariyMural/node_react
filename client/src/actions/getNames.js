import axios from "axios";

export const getNames = () => dispatch => {
  axios
    .get("/api/store/get-names")
    .then(response => {
      dispatch({
        type: "GET_NAMES",
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};
