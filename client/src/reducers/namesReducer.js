import { GET_PRODUCT_NAMES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCT_NAMES:
      return action.payload;
    default:
      return { ...state };
  }
};
