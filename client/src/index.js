import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import reducers from "./reducers";

// const store = createStore(reducers, {}, applyMiddleware(thunk));
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  // <Provider store={store}>
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
