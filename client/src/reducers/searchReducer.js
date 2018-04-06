import { CURRENT_SEARCH_VALUE } from "../actions/types";

export default (state = "", action) => {
  switch (action.type) {
    case CURRENT_SEARCH_VALUE:
      return action.payload;
    default:
      return state;
  }
};
