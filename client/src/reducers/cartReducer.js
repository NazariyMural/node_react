import _ from "lodash";
import {
  TO_CART,
  GET_CART,
  INCREASE,
  DELETE,
  DECREASE
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case TO_CART:
      return _.concat(state, action.payload);
    case GET_CART:
      return { ...action.payload };
    case INCREASE:
      return { ...action.payload };
    case DELETE:
      return { ...action.payload };
    case DECREASE:
      return { ...action.payload };
    default:
      return state;
  }
};
