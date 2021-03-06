import {
  GET_COMPARISON,
  ADD_TO_COMPARE,
  DELETE_ITEM_FROM_COMPARE
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_COMPARISON:
      if (action.payload) {
        return action.payload;
      }
      return state;
    case ADD_TO_COMPARE:
      const data = action.payload;
      let addToComp = { ...state, ...data };
      return addToComp;
    case DELETE_ITEM_FROM_COMPARE:
      return action.payload;
    default:
      return { ...state };
  }
};
