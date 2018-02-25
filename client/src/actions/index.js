import axios from "axios";
import { FETCH_USER } from "./types";
// import { FETCH_DATA } from "./types";

export const fetchUser = () => {
  return dispatch => {
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
  };
};

// export const fetchData = () => {
//   return dispatch => {
//     axios
//       .get("/store")
//       .then(res => {
//         console.log(res, "dispatch Phones Action");
//         dispatch({ type: FETCH_DATA, payload: res.data });
//       })
//       .catch(err => console.log(err, "Action Phones Error"));
//   };
// };
