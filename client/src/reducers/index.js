import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import compareReducer from "./compareReducer";
import ProgressReducer from "./progress";

import getAllProduct from "./getAllProductReducer";
import getTags from "./tagsReduser";
import activeTags from "./activeTagsReducer";
import names from "./namesReducer";
import searchValue from "./searchReducer";

import waitList from "./waitListReducer";

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  comparison: compareReducer,
  progress: ProgressReducer,
  products: getAllProduct,
  tags: getTags,
  activeTags,
  names,
  searchValue,
  waitList
});
