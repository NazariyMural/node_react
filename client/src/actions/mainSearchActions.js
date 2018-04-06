import axios from "axios";
import { HANDLE_LIST, CURRENT_SEARCH_VALUE } from "./types";

export const mainSearch = (id, searchValue, tags) => distpatch => {
  axios.get(`/api/store/${id},${searchValue},${tags}`).then(response => {
    distpatch({
      type: HANDLE_LIST,
      payload: response.data
    });
  });
};

export const searchAction = value => {
  return {
    type: CURRENT_SEARCH_VALUE,
    payload: value
  };
};
