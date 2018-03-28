export default (state = [], action) => {
  switch (action.type) {
    case "GET_NAMES":
      return [...action.payload];
    default:
      return {
        ...state
      };
  }
};
