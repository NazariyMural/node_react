import axios from "axios";
import "whatwg-fetch";
import {
  FETCH_USER,
  FETCH_DATA,
  GET_CART,
  DELETE_ITEM,
  REDUCE,
  ADD_USER_PROPERTY,
  ADD_TO_CART,
  ADD_USER_LOCATION
  // ADD_USER_PHOTO,
} from "./types";
import { clearError } from "./error";

import { decrementProgress, incrementProgress } from "./progress";

export const fetchUser = () => {
  return dispatch => {
    axios
      .get("/api/auth/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
  };
};

export const fetchData = () => {
  console.log("store actions");
  return dispatch => {
    axios
      .get("/api/store/store")
      .then(res => {
        console.log(res, "dispatch Products Action");
        dispatch({ type: FETCH_DATA, payload: res.data });
      })
      .catch(err => console.log(err, "Action Phones Error"));
  };
};

export const getCart = userID => {
  return dispatch => {
    axios
      .get(`/api/cart/${userID}`)
      .then(res => {
        dispatch({ type: GET_CART, payload: res.data });
      })
      .catch(err => err);
  };
};

export const addToCart = addToCartData => {
  return dispatch => {
    axios
      .post("/api/cart/add-to-cart", {
        productId: addToCartData.productId,
        userID: addToCartData.userID
      })
      .then(res => {
        dispatch({ type: ADD_TO_CART, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const reduceByOne = reduceByOneData => {
  return dispatch => {
    axios
      .post("/api/cart/reduce-by-one", {
        productId: reduceByOneData.productId,
        userID: reduceByOneData.userID
      })
      .then(res => {
        dispatch({ type: REDUCE, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const deleteItem = deleteItemData => {
  return dispatch => {
    axios
      .post("/api/cart/delete-item", {
        productId: deleteItemData.productId,
        userID: deleteItemData.userID
      })
      .then(res => {
        dispatch({ type: DELETE_ITEM, payload: res.data });
      })
      .catch(err => console.log(err));
  };
};

export const addUserProperty = userData => dispatch => {
  axios
    .post("/api/user-add/user-add-change", { userData })
    .then(res => {
      console.log(res);
      dispatch({ type: ADD_USER_PROPERTY, payload: res.data });
    })
    .catch(err => console.log(err));
};

//user locaation creator
export const addLocation = userData => dispatch => {
  const location = userData.address;
  const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json`;
  const params = {
    address: location,
    key: "AIzaSyD4sf00SfQgC2fpETO0OPVUcAl7bN3ggQs"
  };
  axios
    .get(geocodeURL, { params })
    .then(response => {
      const data = {
        userData,
        location: response.data.results[0]
      };
      axios.post("/api/user-add/user-add-location/", { data }).then(result => {
        console.log(result.data.location);
        dispatch({
          type: ADD_USER_LOCATION,
          payload: result.data.location
        });
      });
    })
    .catch(err => console.log(err));
};

// export const uploadData = ({ file, userID }) => dispatch => {
//   const storageRef = storage.ref("/user-images").child(userID);
//   storageRef
//     .child(file.name)
//     .put(file, { contentType: file.type })
//     .then(snapshoot => {
//       axios
//         .post("api/user-add-image", {
//           photoURL: snapshoot.downloadURL,
//           userID: userID
//         })
//         .then(response => {
//           dispatch({
//             type: ADD_USER_PHOTO,
//             payload: response.data
//           });
//         });
//     })

//     .catch(err => console.log(err));
// };

export const handleStripeToken = ({ token, amount }) => async dispatch => {
  const res = await axios.post("/api/stripe", { token, amount });
  console.log(res);

  dispatch({ type: FETCH_USER, payload: res.data });
};

//ACTION creators new
export const sessionCheckFailure = () => ({
  type: "AUTHENTICATION_SESSION_CHECK_FAILURE"
});
export const sessionCheckSuccess = json => ({
  type: "AUTHENTICATION_SESSION_CHECK_SUCCESS",
  json
});
export const checkSession = () => dispatch => {
  fetch("/api/auth/checksession", {
    method: "GET",
    credentials: "same-origin"
  })
    // axios
    //   .get("/api/auth/checksession", {
    //     method: "GET",
    //     credentials: "same-origin"
    //   })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then(json => {
      if (json.username) {
        return dispatch(sessionCheckSuccess(json));
      }
      return dispatch(sessionCheckFailure());
    })
    .catch(error => dispatch(sessionCheckFailure(error)));
};

export const registrationFailure = error => ({
  type: "AUTHENTICATION_REGISTRATION_FAILURE",
  error
});
export const registrationSuccess = () => ({
  type: "AUTHENTICATION_REGISTRATION_SUCCESS"
});
export const registrationSuccessViewed = () => ({
  type: "AUTHENTICATION_REGISTRATION_SUCCESS_VIEWED"
});
export const loginAttempt = () => ({ type: "AUTHENTICATION_LOGIN_ATTEMPT" });
export const loginFailure = error => ({
  type: "AUTHENTICATION_LOGIN_FAILURE",
  error
});
export const loginSuccess = json => ({
  type: "AUTHENTICATION_LOGIN_SUCCESS",
  json
});

export function logUserIn(userData) {
  return async dispatch => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // register that a login attempt is being made
    dispatch(loginAttempt());

    // contact login API
    await fetch(
      // where to contact
      "/api/auth/login",
      // what to send
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }
    )
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then(json => {
        if (json) {
          dispatch(loginSuccess(json));
        } else {
          dispatch(
            loginFailure(
              new Error("Email or Password Incorrect. Please Try again.")
            )
          );
        }
      })
      .catch(error => {
        dispatch(loginFailure(new Error(error)));
      });

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// Register a User
export function registerUser(userData) {
  return async dispatch => {
    // clear the error box if it's displayed
    dispatch(clearError());

    // turn on spinner
    dispatch(incrementProgress());

    // contact the API
    await fetch(
      // where to contact
      "/api/auth/register",
      // what to send
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }
    )
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then(async json => {
        if (json && json.username) {
          await dispatch(loginSuccess(json));
          await dispatch(registrationSuccess());
        } else {
          dispatch(
            registrationFailure(
              new Error(
                json.error.message
                  ? "Email or username already exists"
                  : json.error
              )
            )
          );
        }
      })
      .catch(error => {
        dispatch(
          registrationFailure(
            new Error(error.message || "Registration Failed. Please try again.")
          )
        );
      });

    // turn off spinner
    return dispatch(decrementProgress());
  };
}

// export const logout = () => dispatch => {
//   axios
//     .get("/api/logout")
//     .then(result => console.log(result))
//     .catch(err => console.log(err));

//   // dispatch({ type: FETCH_USER, payload: result.data });
// };

// export const loginAttempt = () => ({ type: "AUTHENTICATION_LOGIN_ATTEMPT" });
// export const loginFailure = error => ({
//   type: "AUTHENTICATION_LOGIN_FAILURE",
//   error
// });
// export const loginSuccess = json => ({
//   type: "AUTHENTICATION_LOGIN_SUCCESS",
//   json
// });

// export const storeUser = userData => dispatch => {
//   axios
//     .post("/api/sing-up", userData)
//     .then(result => console.log(result))
//     .catch(err => console.log(err));

//   // dispatch({ type: FETCH_USER, payload: result.data });
// };

export const uploadData = ({ file, userID }) => dispatch => {
  console.log(file);
  const fd = new FormData();
  fd.append("file", file, file.name);
  fd.append("userID", userID);
  axios
    .post("api/user-add-image", fd)
    .then(response => {
      console.log(response);
      // dispatch({
      //   type: ADD_USER_PHOTO,
      //   payload: response.data
      // });
    })
    .catch(err => console.log(err));
};
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// export const putDataToCart = purchaseData => dispatch => {
//   axios
//     .post("/api/cart", { purchaseData })
//     .then(res => {
//       dispatch({ type: TO_CART, payload: res.data });
//     })
//     .catch(err => console.log(err));
// };

// export const getCart = id => {
//   return dispatch => {
//     axios
//       .get(`/api/cart/${id}`)
//       .then(res => {
//         dispatch({ type: GET_CART, payload: res.data });
//       })
//       .catch(err => console.log(err));
//   };
// };

// export const increaseQuantity = increaseData => dispatch => {
//   axios
//     .post("/api/cart/increase", { increaseData })
//     .then(res => {
//       dispatch({ type: INCREASE, payload: res.data });
//     })
//     .catch(err => console.log(err));
// };

// export const deleteFromCart = delData => dispatch => {
//   axios
//     .post("/api/cart/delete", { delData })
//     .then(res => {
//       dispatch({ type: DELETE, payload: res.data });
//     })
//     .catch(err => console.log(err));
// };

// export const decreaseQuantity = decreaseData => dispatch => {
//   axios
//     .post("/api/cart/decrease", { decreaseData })
//     .then(res => {
//       dispatch({ type: DECREASE, payload: res.data });
//     })
//     .catch(err => console.log(err));
// };

//
