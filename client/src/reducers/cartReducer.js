import {
  GET_CART,
  INCREASE,
  DELETE_ITEM,
  REDUCE,
  ADD_TO_CART
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return { ...action.payload };
    case ADD_TO_CART:
      return { ...action.payload };
    case INCREASE:
      return { ...action.payload };
    case REDUCE:
      return { ...action.payload };
    case DELETE_ITEM:
      return { ...action.payload };

    default:
      return state;
  }
};
