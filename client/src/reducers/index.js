import { combineReducers } from "redux";
import authReducer from "./authReducer";
import storeReducer from "./storeReducer";
import cartReducer from "./cartReducer";
import userReduser from "./userReduser";
import ProgressReducer from "./progress";

export default combineReducers({
  authentication: userReduser,
  auth: authReducer,
  products: storeReducer,
  cart: cartReducer,
  // user: userReduser,
  progress: ProgressReducer
});
