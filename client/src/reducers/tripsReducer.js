import {
  CREATE_TRIP,
  UPDATE_TRIP,
  DELETE_TRIP,
  GET_TRIP,
  TRIP_LOADING,
  GET_TRIPS,
  TRIPS_LOADING
} from "../actions/types";

const initialState = {
  trips: [],
  trip: [],
  tripLoading: false,
  tripsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TRIP:
      return {
        ...state,
        trips: [action.payload, ...state.trips]
      };
    case UPDATE_TRIP:
      let index = state.trips.findIndex(
        trip => trip._id === action.payload._id
      );

      state.trips.splice(index, 1);

      return {
        ...state,
       trips: [action.payload, ...state.trips]
      };
    case DELETE_TRIP:
      return {
        ...state,
        trips: state.trips.filter(
          trip => trip._id !== action.payload
        )
      };
    case GET_TRIP:
      return {
        ...state,
        trip: action.payload,
        tripLoading: false
      };
    case GET_TRIPS:
      return {
        ...state,
        trips: action.payload,
        tripsLoading: false
      };
    case TRIP_LOADING:
      return {
        ...state,
        tripLoading: true
      };
    case TRIPS_LOADING:
      return {
        ...state,
        tripsLoading: true
      };
    default:
      return state;
  }
}
