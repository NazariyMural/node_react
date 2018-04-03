import {
  GET_CART,
  INCREASE,
  DELETE_ITEM,
  REDUCE,
  ADD_TO_CART,
  ADD_TO_PURCHASE_HISTORY,
  REMOVE_CART,
  CHECK_PRICE
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.payload;
    case ADD_TO_CART:
      return action.payload;
    case ADD_TO_PURCHASE_HISTORY:
      return action.payload;
    case INCREASE:
      return action.payload;
    case REDUCE:
      return action.payload;
    case CHECK_PRICE:
      return action.payload;
    case DELETE_ITEM:
      return action.payload;
    case REMOVE_CART:
      return action.payload;
    default:
      return state;
  }
};
