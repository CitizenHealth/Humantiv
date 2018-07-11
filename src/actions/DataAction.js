import firebase from "react-native-firebase";
import { Actions } from "react-native-router-flux";
import { DATA_CREATE, DATA_SAVE, DATA_FETCH, DATA_EDIT, HUMANAPI_DATA_FETCH, DATA_EXISTS, TIMESTAMPS_EXISTS } from "./types";
import {
  timeseriesActivityFetch,
  timeseriesSleepFetch,
  timeseriesHeartrateFetch,
  timeseriesStepsFetch,
  timeseriesWeightFetch
} from './TimeSeriesAction';

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
      });
    } else {
      firebase.database().ref(`/users/${currentUser.uid}/${type}`)
      .update(data)
      .then(() => {
        dispatch({ type: DATA_SAVE });
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
          return 
        else
          return currentData + data;
    }, function(error, committed, snapshot) {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
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

  if (currentUser === null) {
    return;
  }
  
  return (dispatch) => {
//    console.log(`Try: ${type}`);
    firebase.database().ref(`/users/${currentUser.uid}/${type}`)
    .on("value", snapshot => {
//      console.log(`Yay: ${JSON.stringify(snapshot.val())}`);
      let data = snapshot.val();
      if (type === "humanapi" && data != null ) {
//        dispatch(timeseriesActivityFetch({access_token: data.access_token}));
//        var testToken = "Zff8X6NFVDPdUf00z6g1QUVtHoQ=_nTu8Lvg45198035cecaa04124ab91663aa5e9a4fa43f6fb9d75637baa8533b22a44b7b202fe7ebce012413d5e667ad53b061e048c25805d96794e00f41166223cfb492e5ff81a16c0b210dda57e97c90eb27cc9042f9a9c568442386ad7672efb535961c0ce8caa450b852a8560e6127885ed2d"
        var testToken = data.access_token;
        dispatch(timeseriesActivityFetch({access_token: testToken}));
        dispatch(timeseriesStepsFetch({access_token: testToken}));
        dispatch(timeseriesSleepFetch({access_token: testToken}));
        dispatch(timeseriesHeartrateFetch({access_token: testToken}));
        dispatch(timeseriesWeightFetch({access_token: testToken}));
      }
      if (type === "timestamps" ) {
        dispatch(dataFetch({type: "humanapi"}));
      }
      dispatch({ type: DATA_FETCH, payload: {type, data} });
    }, error => {
//      console.log(`Error: ${error}`);
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
      console.log(exists);
      console.log(Actions.currentScene);
      if (Actions.currentScene === 'login') {
       (exists) ? Actions.main(): Actions.journey();
      }
      dispatch({ type: DATA_EXISTS, payload: {type, exists} });
    });
  };
};

export const timestampExists = ({type}) => {
  const { currentUser } = firebase.auth();

  if (currentUser === null) {
    return;
  }

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/timestamps/${type}`)
    .once("value", snapshot => {
      let exists = snapshot.exists();
      if (exists) {
        dispatch(dataFetch({type: "timestamps"}));
      } else {
        dispatch(dataFetch({type: "humanapi"}));
      }
      dispatch({ type: TIMESTAMPS_EXISTS, payload: {type, exists} });
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
      dispatch(dataSave({type: "humanapi", data: {
        public_token: publicToken,
        human_id: snapshot.val().humanId,
        access_token: snapshot.val().accessToken
      }}));
      // ... and delete the entry in the temp /humanapi database
      dispatch(
        firebase.database().ref(`/humanapi/${publicToken}`)
        .remove()
      );
    })
  };
};