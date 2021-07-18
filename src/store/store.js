import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { productoReducer } from "../reducers/productoReducer";

const {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} = require("redux");

const reducers = combineReducers({
 auth : authReducer,
 producto : productoReducer
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
