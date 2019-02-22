import firebase from "react-native-firebase";
import { CONFIG_UPDATE } from "./types";


export const getConfiguration = (parameter) => {
  return (dispatch) => {
    firebase.config().fetch()
    .then(() => {
      return firebase.config().activateFetched();
    })
    .then((activated) => {
      if (!activated) console.log(`Fetched ${parameter} not activated`);
      return firebase.config().getValue(parameter);
    })
    .then((snapshot) => {
      console.log(`Fetched ${parameter} = ${snapshot.val()}`);
      dispatch(
        {
          type: CONFIG_UPDATE, 
          payload: {
            prop: parameter, 
            value: snapshot.val()
          }
        });
    })
    .catch(console.error);
  };
};
