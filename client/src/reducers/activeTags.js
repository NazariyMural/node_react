export default (state = [], action) => {
  switch (action.type) {
    case "ACIVE_TAGS":
      // console.log(action.payload);
      return action.payload;
    default:
      return {
        ...state
      };
  }
};
