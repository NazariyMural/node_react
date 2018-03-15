import {
  GET_COMPARISON,
  ADD_TO_COMPARE,
  DELETE_ITEM_FROM_COMPARE
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_COMPARISON:
      return { ...action.payload };
    case ADD_TO_COMPARE:
      return { ...action.payload };
    case DELETE_ITEM_FROM_COMPARE:
      return { ...action.payload };
    default:
      return state;
  }
};
