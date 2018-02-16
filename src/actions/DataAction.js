import firebase from "react-native-firebase";
import { Actions } from "react-native-router-flux";
import { DATA_CREATE, DATA_SAVE, DATA_FETCH, DATA_EDIT } from "./types";

export const dataCreate = ({type, prop, value}) => {
  return ({
    type: DATA_CREATE,
    payload: {type, prop, value}
  });
};

export const dataSave = ({type, data}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/${type}`)
    .update(data)
    .then(() => {
      dispatch({ type: DATA_SAVE });
    });
  };
};

export const dataEdit = ({profile}) => {
  const { currentUser } = firebase.auth();
  const { 
    country,
    state,
    city
  } = profile;

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/profile/${profile.uid}`)
    .set({ country, state, city })
    .then(() => {
      dispatch({ type: DATA_EDIT });
    });
  };
};

export const dataFetch = ({type}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/${type}`)
    .on("value", snapshot => {
      let data = snapshot.val();
      dispatch({ type: DATA_FETCH, payload: {type, data} });
    });
  };
};
