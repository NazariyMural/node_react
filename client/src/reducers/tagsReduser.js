import { GET_TAGS } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_TAGS:
      return action.payload;
    default:
      return state;
  }
};
