import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import tripsReducer from "./tripsReducer";
import todosReducer from "./todosReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  trips: tripsReducer,
  todos: todosReducer
});