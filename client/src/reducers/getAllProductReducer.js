import { LOAD_ALL_PRODUCT, HANDLE_LIST } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_ALL_PRODUCT:
      console.log("object");
      return action.payload;
    case HANDLE_LIST:
      return action.payload;
    default:
      return { ...state };
  }
};
