import firebase from 'react-native-firebase';
import {HEALTH_FETCH, HEALTH_ADD, HEALTH_DELETE, HEALTH_SCORE_SAVE} from './types';

export const addHealthTimeSeries = (type, time_series) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return (dispatch) => {
      dispatch({ type: "NOTHING" });
    };
  }

  const time = time_series.time;
  var metricItem = {};
  metricItem[time] = time_series.value;
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/health/${type}`).orderByChild('time')
    .update(metricItem)
    .then(() => {
      dispatch({ type: HEALTH_ADD });
    });
  };
};

export const removeTimeSeries = (type, id) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return;
  }

  return (dispatch) => {
    const ref = firebase.database().ref(`/users/${currentUser.uid}/health/${type}/${id}`)
    ref.remove();
  };
}

export const fetchHealthTimeSeries = ({type}) => {
  const {currentUser} = firebase.auth();

  if (currentUser === null) {
    return;
  }
  
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/health/${type}`).orderByKey()
    .on("value", snapshot => {
      dispatch({ type: HEALTH_FETCH, payload: {type: type, data: snapshot.val() }});
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }
}

export const healthScoreSave = ({healthscore, total}) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return;
  }

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/health/score`)
    .update({healthscore, total})
    .then(() => {
      dispatch({ type: HEALTH_SCORE_SAVE });
    });
  };
};
