import axios from "axios";

import {
  CREATE_TRIP,
  UPDATE_TRIP,
  DELETE_TRIP,
  GET_TRIP,
  TRIP_LOADING,
  GET_TRIPS,
  TRIPS_LOADING
} from "./types";

export const createTrip = tripData => dispatch => {
  axios
    .post("/api/trips/create", tripData)
    .then(res =>
      dispatch({
        type: CREATE_TRIP,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const updateTrip = tripData => dispatch => {
  axios
    .patch("/api/trips/update", tripData)
    .then(res =>
      dispatch({
        type: UPDATE_TRIP,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};


export const deleteTrip = (id, history) => dispatch => {
  axios
    .delete(`/api/trips/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TRIP,
        payload: id
      })
    )
    .then(res => history.push("/dashboard"))
    .catch(err => console.log(err));
};

export const getTrip = id => dispatch => {
  dispatch(setTripLoading());
  axios
    .get(`/api/trips/${id}`)
    .then(res =>
      dispatch({
        type: GET_TRIP,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRIP,
        payload: null
      })
    );
};

export const getTrips = () => dispatch => {
  dispatch(setTripsLoading());
  axios
    .get("/api/trips")
    .then(res =>
      dispatch({
        type: GET_TRIPS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRIPS,
        payload: null
      })
    );
};

export const setTripLoading = () => {
  return {
    type: TRIP_LOADING
  };
};

export const setTripsLoading = () => {
  return {
    type: TRIPS_LOADING
  };
};
