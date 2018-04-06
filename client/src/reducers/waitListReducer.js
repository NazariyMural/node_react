import {
  ADD_TO_WAITLIST,
  GET_WAITLIST,
  REMOVE_FROM_WAITLIST
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TO_WAITLIST:
      return action.payload;
    case GET_WAITLIST:
      return action.payload;

    case REMOVE_FROM_WAITLIST:
      return action.payload;
    default:
      return { ...state };
  }
};
