import { combineReducers } from "redux";
import authReducer from "./authReducer";
import storeReducer from "./storeReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  auth: authReducer,
  phones: storeReducer,
  cart: cartReducer
});
