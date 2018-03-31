import { combineReducers } from "redux";
import authReducer from "./authReducer";
import storeReducer from "./storeReducer";
import cartReducer from "./cartReducer";
import compareReducer from "./compareReducer";
import ProgressReducer from "./progress";

import getAllProduct from "./getAllProduct";
import getTags from "./tagsReduser";
import activeTags from "./activeTags";
import names from "./namesReducer";
import searchValue from "./searchReducer";

import waitList from "./waitListReducer";

export default combineReducers({
  auth: authReducer,
  products: storeReducer,
  cart: cartReducer,
  comparison: compareReducer,
  progress: ProgressReducer,

  getAllProducts: getAllProduct,
  tags: getTags,
  activeTags,
  names,
  searchValue,
  waitList
});
