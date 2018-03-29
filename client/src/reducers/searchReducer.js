export default (state = "", action) => {
  switch (action.type) {
    case "CURRENT_SEARCH_VALUE":
      // console.log(action.payload);
      // return {
      //   ...state
      // };
      return action.payload;
    // default:
    //   return {
    //     ...state
    //   };
    default:
      return state;
  }
};
