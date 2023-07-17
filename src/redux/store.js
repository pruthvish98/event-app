import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "./rootReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer()
);