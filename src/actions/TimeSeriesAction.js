import firebase from "react-native-firebase";
import {
  getActivityTimeSeries,
  getHeartrateTimeSeries,
  getSleepTimeSeries,
  getStepsTimeSeries,
  getWeightTimeSeries
} from '../business/sources'
import { 
  TIMESERIES_ACTIVITY_FETCH,
  TIMESERIES_HEARTRATE_FETCH,
  TIMESERIES_SLEEP_FETCH,
  TIMESERIES_WEIGHT_FETCH,
  TIMESERIES_STEPS_FETCH,
  TIMESERIES_STRESS_FETCH,
  } from "./types";

export const timeseriesActivityFetch = ({access_token}) => {

  return (dispatch) => {
    getActivityTimeSeries(access_token)
    .then((values) => {
      dispatch({ type: TIMESERIES_ACTIVITY_FETCH, payload: values });
    })
  };
};

export const timeseriesStepsFetch = ({access_token}) => {

  return (dispatch) => {
    getStepsTimeSeries(access_token)
    .then((values) => {
      dispatch({ type: TIMESERIES_STEPS_FETCH, payload: values });
    })
  };
};

export const timeseriesHeartrateFetch = ({access_token}) => {

  return (dispatch) => {
    getHeartrateTimeSeries(access_token)
    .then((values) => {
      dispatch({ type: TIMESERIES_HEARTRATE_FETCH, payload: values });
    })
  };
};

export const timeseriesSleepFetch = ({access_token}) => {

  return (dispatch) => {
    getSleepTimeSeries(access_token)
    .then((values) => {
      dispatch({ type: TIMESERIES_SLEEP_FETCH, payload: values });
    })
  };
};

export const timeseriesWeightFetch = ({access_token}) => {

  return (dispatch) => {
    getWeightTimeSeries(access_token)
    .then((values) => {
      dispatch({ type: TIMESERIES_WEIGHT_FETCH, payload: values });
    })
  };
};
