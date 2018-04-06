import { ACIVE_TAGS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ACIVE_TAGS:
      return action.payload;
    default:
      return { ...state };
  }
};
