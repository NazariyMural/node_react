import axios from "axios";

export const mainSearch = (id, searchValue, tags) => distpatch => {
  axios.get(`/api/store/${id},${searchValue},${tags}`).then(response => {
    distpatch({
      type: "HANDLE_LIST",
      payload: response.data
    });
  });
};
