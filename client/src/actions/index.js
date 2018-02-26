import axios from "axios";
import { FETCH_USER, FETCH_DATA, TO_CART } from "./types";

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

export const putDataToCart = (id) => {
  console.log(id)
  return {
    type: TO_CART,
    payload: id
  }
};


// export const getPost = (id) => {
//   const URL = `${ROOT_URL}/posts/${id}${API_KEY}`;
//   const request = axios.get(URL);
//   return {
//     type: GET_POST,
//     payload: request
//   }
// }