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
  ADD_USER_LOCATION,
  ADD_USER_PHOTO,
  CHECK_USER_SESSION,
  LOGIN_USER_SUCCESS,
  LOGOUT_SUCCESS
} from "./types";

import { decrementProgress, incrementProgress } from "./progress";

export const fetchUser = () => {
  return dispatch => {
    axios
      .get("/api/auth/current_user")
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
  };
};

// export const googleLogin = () => {
//   return dispatch => {
//     axios
//       .get("/api/auth/google")
//       .then(res => dispatch({ type: LOGIN_WITH_GOOGLE, payload: res.data }));
//   };
// };

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

export const uploadData = ({ file, userID }) => dispatch => {
  console.log(file);
  const data = new FormData();
  data.append("file", file);
  data.append("userID", userID);
  axios
    .post("/api/user-add/user-add-image", data)
    .then(response => {
      console.log(response);
      dispatch({
        type: ADD_USER_PHOTO,
        payload: response.data
      });
    })

    .catch(err => console.log(err));
};

export const handleStripeToken = ({ token, amount }) => async dispatch => {
  const res = await axios.post("/api/stripe", { token, amount });
  console.log(res);

  dispatch({ type: FETCH_USER, payload: res.data });
};
export const logoutFailure = error => ({
  type: "AUTHENTICATION_LOGOUT_FAILURE",
  error
});
export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

export const logUserOut = () => dispatch => {
  fetch("/api/auth/logout", {
    method: "GET",
    credentials: "same-origin"
  })
    .then(response => {
      if (response.status === 200) {
        dispatch(logoutSuccess());
      } else {
        dispatch(logoutFailure(new Error(response.status)));
      }
    })
    .catch(error => console.log(error));
};

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
        console.log(json.username);
        return dispatch({ type: CHECK_USER_SESSION, payload: json });
      } else {
        return dispatch({ type: CHECK_USER_SESSION, payload: null });
      }
    })
    .catch(error => console.log(error));
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
  type: LOGIN_USER_SUCCESS,
  json
});

export function logUserIn(userData) {
  return async dispatch => {
    // turn on spinner
    dispatch(incrementProgress());
    // register that a login attempt is being made
    dispatch(loginAttempt());

    await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then(json => {
        if (json) {
          return dispatch(loginSuccess(json));
          // return dispatch({ type: LOGIN_USER_SUCCESS, payload: json });
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
export const registerUser = userData => dispatch => {
  // turn on spinner
  dispatch(incrementProgress());
  fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
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
