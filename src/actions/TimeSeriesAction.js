import firebase from "react-native-firebase";
import {
  getActivityTimeSeries,
  getHeartrateTimeSeries,
  getSleepTimeSeries,
  getStepsTimeSeries,
  getWeightTimeSeries,
  getNativeActivityTimeSeries,
  getNativeStepsTimeSeries,
  getNativeHeartrateTimeSeries,
  getNativeSleepTimeSeries
} from '../business/sources'
import { 
  TIMESERIES_ACTIVITY_FETCH,
  TIMESERIES_HEARTRATE_FETCH,
  TIMESERIES_SLEEP_FETCH,
  TIMESERIES_WEIGHT_FETCH,
  TIMESERIES_STEPS_FETCH,
  TIMESERIES_STRESS_FETCH,
  TIMESERIES_MEDIT_FETCH,
  TIMESERIES_SCORE_FETCH
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

export const nativeTimeSeries = () => {
  return (dispatch) => {
    getNativeActivityTimeSeries()
    .then((values) => {
      dispatch({ type: TIMESERIES_ACTIVITY_FETCH, payload: values });
    });
    getNativeStepsTimeSeries()
    .then((values) => {
      dispatch({ type: TIMESERIES_STEPS_FETCH, payload: values });
    });
    getNativeHeartrateTimeSeries()
    .then((values) => {
      dispatch({ type: TIMESERIES_HEARTRATE_FETCH, payload: values });
    });
    getNativeSleepTimeSeries()
    .then((values) => {
      dispatch({ type: TIMESERIES_SLEEP_FETCH, payload: values });
    });
  };
}
