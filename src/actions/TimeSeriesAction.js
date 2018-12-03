import firebase from "react-native-firebase";
import { 
  TIMESERIES_ACTIVITY_FETCH,
  TIMESERIES_HEARTRATE_FETCH,
  TIMESERIES_SLEEP_FETCH,
  TIMESERIES_WEIGHT_FETCH,
  TIMESERIES_STEPS_FETCH,
  TIMESERIES_MEDIT_FETCH,
  TIMESERIES_SCORE_FETCH
  } from "./types";

export const timeseriesActivityFetch = (values) => {
  return { type: TIMESERIES_ACTIVITY_FETCH, payload: values };
};

export const timeseriesStepsFetch = (values) => {
  return { type: TIMESERIES_STEPS_FETCH, payload: values };
};

export const timeseriesHeartrateFetch = (values) => {
  return { type: TIMESERIES_HEARTRATE_FETCH, payload: values };
};

export const timeseriesSleepFetch = (values) => {
  return { type: TIMESERIES_SLEEP_FETCH, payload: values };
};

export const timeseriesWeightFetch = (values) => {
  return { type: TIMESERIES_WEIGHT_FETCH, payload: values };
};

export const timeseriesMeditFetch = () => {

  const {currentUser} = firebase.auth();

  if (currentUser === null) {
    return;
  }
  
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/history/medit`).orderByKey()
    .on("value", snapshot => {
      dispatch({ type: TIMESERIES_MEDIT_FETCH, payload: snapshot.val() });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }
};

export const timeseriesScoreFetch = () => {

  const {currentUser} = firebase.auth();

  if (currentUser === null) {
    return;
  }
  
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/health/score/history`).orderByKey()
    .on("value", snapshot => {
      dispatch({ type: TIMESERIES_SCORE_FETCH, payload: snapshot.val() });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }
};

export const addMeditTimeSeries = (data) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return;
  }

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/history/medit`)
    .update(data)
    .then(() => {
      console.log("Add Medit History Successful");
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

export const addHealthScoreTimeSeries = (data) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return;
  }

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/health/score/history`)
    .update(data)
    .then(() => {
      console.log("Add Health Score History Successful");
    })
    .catch((error) => {
      console.log(error);
    });
  };
}
