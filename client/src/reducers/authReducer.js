import {
  FETCH_USER,
  ADD_USER_PROPERTY,
  ADD_USER_LOCATION,
  ADD_USER_PHOTO
} from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case ADD_USER_PROPERTY:
      return { ...action.payload };
    case ADD_USER_LOCATION:
      const newState = { ...state };
      newState.location = action.payload;
      return newState;
    case ADD_USER_PHOTO:
      return { ...action.payload };
    default:
      return state;
  }
};
