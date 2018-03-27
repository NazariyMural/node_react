import axios from "axios";

export const handlePaginationLists = (id, data) => distpatch => {
  axios.get(`/api/store/${id},${data}`).then(response => {
    distpatch({
      type: "HANDLE_LIST",
      payload: response.data
    });
  });
};
