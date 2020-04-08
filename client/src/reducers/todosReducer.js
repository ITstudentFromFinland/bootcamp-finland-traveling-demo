import {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  GET_TODOS,
  TODOS_LOADING
} from "../actions/types";

const initialState = {
  todos: [],
  todosLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        todosLoading: false
      };
    case UPDATE_TODO:
      let index = state.todos.findIndex(
        todo => todo._id === action.payload._id
      );

      state.todos.splice(index, 1);

      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload)
      };
    case TODOS_LOADING:
      return {
        ...state,
        todosLoading: true
      };
    default:
      return state;
  }
}
