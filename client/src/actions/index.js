import axios from "axios";
import {
  FETCH_USER,
  FETCH_DATA,
  GET_CART,
  DELETE_ITEM,
  REDUCE,
  ADD_USER_PROPERTY,
  ADD_TO_CART,
  ADD_USER_LOCATION,
  ADD_USER_PHOTO
} from "./types";

import { storage } from "../firebase";

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
    .post("/api/user-add", { userData })
    .then(res => {
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
      axios.post("/api/user-add-location", { data }).then(result => {
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
  const storageRef = storage.ref("/user-images").child(userID);
  storageRef
    .child(file.name)
    .put(file, { contentType: file.type })
    .then(snapshoot => {
      axios
        .post("api/user-add-image", {
          photoURL: snapshoot.downloadURL,
          userID: userID
        })
        .then(response => {
          dispatch({
            type: ADD_USER_PHOTO,
            payload: response.data
          });
        });
    })

    .catch(err => console.log(err));
};

export const handleStripeToken = ({ token, amount }) => async dispatch => {
  const res = await axios.post("/api/stripe", { token, amount });
  console.log(res);

  dispatch({ type: FETCH_USER, payload: res.data });
};

// export const uploadData = ({ file, userID }) => dispatch => {
//   console.log(file);
//   const fd = new FormData();
//   fd.append("file", file, file.name);
//   fd.append("userID", userID);
//   axios
//     .post("api/user-add-image", fd)
//     .then(response => {
//       console.log(response);
//       dispatch({
//         type: ADD_USER_PHOTO,
//         payload: response.data
//       });
//     })
//     .catch(err => console.log(err));
// };

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
