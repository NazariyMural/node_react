import { GET_COMPARISON, ADD_TO_COMPARE } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case GET_COMPARISON:
      return { ...action.payload };
    case ADD_TO_COMPARE:
      return { ...action.payload };
    default:
      return state;
  }
};
