import axios from "axios";
import { GET_TAGS, ACIVE_TAGS } from "./types";

export const getTags = () => dispatch => {
  axios
    .get("/api/store/get-tags")
    .then(response => {
      dispatch({
        type: GET_TAGS,
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};

export const activeTags = tags => {
  return {
    type: ACIVE_TAGS,
    payload: tags
  };
};
