import { FETCH_USER, ADD_USER_PROPERTY } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case ADD_USER_PROPERTY:
      return { ...action.payload };
    default:
      return state;
  }
};
