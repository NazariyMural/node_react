import {
  ADD_TO_WAITLIST,
  GET_WAITLIST,
  REMOVE_FROM_WAITLIST
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TO_WAITLIST:
      console.log(action.payload);
      return { ...action.payload };
    case GET_WAITLIST:
      return { ...action.payload };

    case REMOVE_FROM_WAITLIST:
      console.log("REMOVE_FROM_WAITLIST reducer", action.payload);
      return { ...action.payload };
    default:
      return { ...state };
  }
};
