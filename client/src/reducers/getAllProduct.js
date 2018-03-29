export default (state = null, action) => {
  switch (action.type) {
    case "LOAD_ALL_PRODUCT":
      return {
        ...action.payload
      };
    case "HANDLE_LIST":
      return {
        ...action.payload
      };
    default:
      return {
        ...state
      };
  }
};
