import firebase from "react-native-firebase";
import { Actions } from "react-native-router-flux";
import { DATA_CREATE, DATA_SAVE, DATA_FETCH, DATA_EXISTS } from "./types";
import {
  Sentry,
  SentrySeverity
} from 'react-native-sentry';

export const dataCreate = ({type, prop, value}) => {
  return ({
    type: DATA_CREATE,
    payload: {type, prop, value}
  });
};

export const dataSave = ({type, data}) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return;
  }

  return (dispatch) => {
    if (type === "messaging") {
      firebase.database().ref(`/users/${currentUser.uid}/${type}/fcm/${data}`)
      .set(data)
      .then(() => {
        dispatch({ type: DATA_SAVE });
      })
      .catch ( error => {
        Sentry.captureMessage(`dataSave ${type}/fcm/${data} failed: ${error}`, {
          level: SentrySeverity.Info
        });
      });;
    } else {
      firebase.database().ref(`/users/${currentUser.uid}/${type}`)
      .update(data)
      .then(() => {
        dispatch({ type: DATA_SAVE });
      })
      .catch ( error => {
        Sentry.captureMessage(`dataSave ${type} failed: ${error}`, {
          level: SentrySeverity.Info
        });
      });
    }    
  };
};

export const dataAdd = ({type, item, data}) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return;
  }

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/${type}/${item}`)
    .transaction(function(currentData) {
        if (!currentData)
          return data;
        else
          return currentData + data;
    }, function(error, committed, snapshot) {
      if (error) {
        // Log the activity array
        Sentry.captureMessage(`Transaction ${type}/${item} failed abnormally: ${error}`, {
          level: SentrySeverity.Info
        });
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
        // Log the activity array
        Sentry.captureMessage(`Transaction ${type}/${item} was not committed: ${committed}`, {
          level: SentrySeverity.Info
        });
        console.log('The transaction was transaction.');
      } else {
        console.log('Data added succesfully');
      }
      console.log("Data added is: ", snapshot.val());
      dispatch({ type: DATA_SAVE });
    },
    true)
  };
};

export const dataFetch = ({type}) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    reject(new Error('No user found'));
  }
  
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/${type}`)
    .on("value", snapshot => {
      let data = snapshot.val();
      dispatch({ type: DATA_FETCH, payload: {type, data} });
    }, error => {
      Sentry.captureMessage(`dataFetch ${type} failed: ${error}`, {
        level: SentrySeverity.Info
      });
    });
  };
};

export const walletFetch = ({type}) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return;
  }
  
  return (dispatch) => {
    console.log(`Try: ${type}`);
    firebase.database().ref(`/users/${currentUser.uid}/${type}`)
    .on("value", snapshot => {
      console.log(`Yay: ${JSON.stringify(snapshot.val())}`);
      let data = snapshot.val();
      dispatch({ type: DATA_FETCH, payload: {type, data} });
    }, error => {
      Sentry.captureMessage(`walletFetch ${type} failed.`, {
        level: SentrySeverity.Info
      });
      console.log(`Error: ${error}`);
    });
  };
};

export const dataExists = ({type}) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return;
  }

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/profile/${type}`)
    .once("value", snapshot => {
      let exists = snapshot.exists();
      console.log(`${type} exists: ${exists}`);
      console.log(`Actions.currentScene: ${Actions.currentScene}`);
      console.log(`Actions.currentScene === 'login': ${Actions.currentScene === 'login'}`);
      console.log(`Actions.currentScene === 'register': ${Actions.currentScene === 'register'}`);
      console.log(`Actions.currentScene === 'load': ${Actions.currentScene === 'load'}`);
      if (Actions.currentScene === 'login' ||
          Actions.currentScene === 'register'||
          Actions.currentScene === 'load') {
       (exists) ? Actions.main(): Actions.journeyflow();
      }
      dispatch({ type: DATA_EXISTS, payload: {type, exists} });
    }, error => {
      Sentry.captureMessage(`dataExists /profile/${type} failed.`, {
        level: SentrySeverity.Info
      });
      console.log(`Error: ${error}`);
    });
  };
};

export const humanAPIFetch = (publicToken) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return;
  }
  
  return (dispatch) => {
    // Move the data from the /humanapi database ...
    firebase.database().ref(`/humanapi/${publicToken}`)
    .once("value", snapshot => {
      // ... to the main users database ...
      dispatch(
        dataSave({type: "humanapi", data: {
          public_token: publicToken,
          human_id: snapshot.val().humanId,
          access_token: snapshot.val().accessToken
        }
      })
      .catch( error => {
        Sentry.captureMessage(`humanAPIFetch - dataSave humanapi failed.`, {
          level: SentrySeverity.Info
        });
      })
      );
      // ... and delete the entry in the temp /humanapi database
      dispatch(
        firebase.database().ref(`/humanapi/${publicToken}`)
        .remove()
        .catch( error => {
          Sentry.captureMessage(`humanAPIFetch - remove /humanapi/${publicToken} failed.`, {
            level: SentrySeverity.Info
          });
        })
  
      );
    })
  };
};