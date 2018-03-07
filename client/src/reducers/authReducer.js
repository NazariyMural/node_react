import {
  FETCH_USER,
  ADD_USER_PROPERTY,
  ADD_USER_LOCATION,
  ADD_USER_PHOTO,
  CHECK_USER_SESSION,
  LOGIN_USER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_WITH_GOOGLE
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return action.payload || false;
    }
    case LOGIN_WITH_GOOGLE: {
      console.log("action.payload", action.payload);
      return state;
    }
    case ADD_USER_PROPERTY: {
      return { ...action.payload };
    }
    case ADD_USER_LOCATION: {
      const newState = { ...state };
      newState.location = action.payload;
      return newState;
    }
    case ADD_USER_PHOTO: {
      return { ...action.payload };
    }
    case CHECK_USER_SESSION: {
      console.log("action.payload", action.payload);
      if (!action.payload) {
        return false;
      }
      const checkSesionState = Object.assign({}, state);
      checkSesionState.fullName = action.payload.fullName;
      checkSesionState.isLoggedIn = true;
      checkSesionState.username = action.payload.username;
      checkSesionState.email = action.payload.email;
      if (action.payload.photo) {
        checkSesionState.photo = action.payload.photo;
      }
      if (action.payload.location) {
        checkSesionState.location = action.payload.location;
      }
      checkSesionState.googleId = action.payload.googleId;
      if (action.payload.phone) {
        checkSesionState.phone = action.payload.phone;
      }
      return checkSesionState;
    }
    case LOGIN_USER_SUCCESS: {
      console.log(action.json);
      const newState = Object.assign({}, state);
      newState.fullName = action.json.fullName;
      newState.id = action.json._id;
      newState.isLoggedIn = true;
      newState.username = action.json.username;
      newState.email = action.json.email;
      if (action.json.photo) {
        newState.photo = action.json.photo;
      }
      if (action.json.location) {
        newState.location = action.json.location;
      }
      newState.googleId = action.json.googleId;
      if (action.json.phone) {
        newState.phone = action.json.phone;
      }
      return newState;
    }
    case LOGOUT_SUCCESS: {
      console.log("LOGOUT_SUCCESS");
      return false;
    }
    default:
      return state;
  }
};
