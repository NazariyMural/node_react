import { ADD_TO_WAITLIST, GET_WAITLIST } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TO_WAITLIST:
      return { ...action.payload };
    case GET_WAITLIST:
      console.log(action.payload);
      return { ...action.payload };
    default:
      return { ...state };
  }
};
