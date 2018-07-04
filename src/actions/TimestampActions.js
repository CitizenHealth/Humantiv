import firebase from 'react-native-firebase';
import {TIMESTAMP_FETCH, TIMESTAMP_ADD, TIMESTAMP_EXISTS} from './types';

export const addTimestamp = (type, timestamp) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return (dispatch) => {
      dispatch({ type: "NOTHING" });
    };
  }

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/health/${type}`).orderByChild('time')
    .update(timestamp)
    .then(() => {
      dispatch({ type: TIMESTAMP_ADD });
    });
  };
};

export const timestampExists = ({type}) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return;
  }

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/health/${type}`)
    .on("value", snapshot => {
      let exists = snapshot.exists();
      console.log(exists);
      console.log(Actions.currentScene);
      if (Actions.currentScene === 'login') {
       (exists) ? Actions.main(): Actions.journey();
      }
      dispatch({ type: DATA_EXISTS, payload: {type, exists} });
    });
  };
};

export const fetchTimestamp = ({type}) => {
  const {currentUser} = firebase.auth();

  if (currentUser === null) {
    return;
  }
  
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/health/${type}`).orderByKey()
    .on("value", snapshot => {
      dispatch({ type: TIMESTAMP_FETCH, payload: {type: type, timestamp: snapshot.val() }});
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }
}
