import axios from "axios";
import { ADD_USER_PROPERTY, ADD_USER_LOCATION, ADD_USER_PHOTO } from "./types";

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
  const location = userData.updateData.address;
  const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json`;
  const params = {
    address: location,
    key: "AIzaSyD4sf00SfQgC2fpETO0OPVUcAl7bN3ggQs"
  };
  console.log(params);
  axios
    .get(geocodeURL, { params })
    .then(response => {
      const data = {
        userData,
        location: response.data.results[0]
      };
      axios.post("/api/user-add/user-add-location/", { data }).then(result => {
        dispatch({
          type: ADD_USER_LOCATION,
          payload: result.data.location
        });
      });
    })
    .catch(err => console.log(err));
};

export const uploadData = ({ file, userID }) => dispatch => {
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
