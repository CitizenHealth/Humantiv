import firebase from 'react-native-firebase';
import {HEALTH_FETCH, HEALTH_ADD, HEALTH_DELETE} from './types';

export const addHealthTimeSeries = (type, time_series) => {
  const { currentUser } = firebase.auth();

  const time = time_series.time;
  var storyItem = {};
  metricItem[time] = time_series;
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

  return (dispatch) => {
    const ref = firebase.database().ref(`/users/${currentUser.uid}/health/${type}/${id}`)
    ref.remove();
  };
}

export const fetchHealthTimeSeries = ({type}) => {
  const {currentUser} = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/health/${type}`)
    .on("value", snapshot => {
      dispatch({ type: HEALTH_FETCH, payload: {type: type, data: snapshot.val() }});
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }
}
