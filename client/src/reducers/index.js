import { combineReducers } from "redux";
import authReducer from "./authReducer";
import storeReducer from "./storeReducer";
import cartReducer from "./cartReducer";
import compareReducer from "./compareReducer";
import ProgressReducer from "./progress";

export default combineReducers({
  auth: authReducer,
  products: storeReducer,
  cart: cartReducer,
  comparison: compareReducer,
  progress: ProgressReducer
});
