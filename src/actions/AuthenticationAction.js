import firebase from "react-native-firebase";
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import { Actions } from "react-native-router-flux";
import { EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER,
  LOGOUT_USER,
  GOOGLE_LOGIN_USER,
  FACEBOOK_LOGIN_USER
} from "./types";

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      dispatch({ type: LOGIN_USER });
    })
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: CREATE_USER });
        // Create user database
        
      })
      .catch((error) => { loginUserFail(dispatch, error); });
    });
  };
};

const loginUserSuccess = (dispatch, user) => {
  //If user not verified with email then send verification email and wait
  dispatch(
    {
      type: LOGIN_USER_SUCCESS,
      payload: user._user
    });    
  Actions.main();
  
};

const loginUserFail = (dispatch, error) => {
  dispatch(
    {
      type: LOGIN_USER_FAIL,
      payload: error.message
    });
};

export const loginGoogleUser = () => {
  return (dispatch) => {
    googleLogin(dispatch);
  };
};

export const loginFacebookUser = () => {
  return (dispatch) => {
    facebookLogin(dispatch);
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut()
    .then(() => {
      dispatch({type: LOGOUT_USER});
    }).catch( (error) => {
      console.log("Logout: Error - "+error.message);
    });
  };
};

export const fetchUser = (user) => {
  if (!user)
    console.log("User is null");
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: user._user
    });
  };
};

// Calling this function will open Google for login.
 const googleLogin = (dispatch) => {
  // Add configuration settings here:
  return GoogleSignin.configure({
    iosClientId: "847047929311-ibked2hj6k5263b55bcjfnpiemrbpans.apps.googleusercontent.com", // only for iOS
  })
  .then(() => {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      // play services are available. can now configure library
      GoogleSignin.signIn()
      .then((data) => {
        
        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        dispatch({ type: GOOGLE_LOGIN_USER });
  
        // login with credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then((user) => {
        console.info(JSON.stringify(user.toJSON()));
        loginUserSuccess(dispatch, user);
        console.log("Signed In with Google");
      })
      .catch((error) => {
        console.error(`Login fail with error: ${error}`);
        loginUserFail(dispatch, error);
      });
    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    });
   });
};

// Calling the following function will open the FB login dialogue:
const facebookLogin = (dispatch) => {
  return LoginManager
    .logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (!result.isCancelled) {
        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
        // get the access token
        return AccessToken.getCurrentAccessToken();
      }
    })
    .then(data => {
      if (data) {
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
        dispatch({ type: FACEBOOK_LOGIN_USER });
        // login with credential
        return firebase.auth().signInWithCredential(credential);
      }
    })
    .then((user) => {
      if (user) {
        console.info(JSON.stringify(user.toJSON()));
        loginUserSuccess(dispatch, user);
      }
    })
    .catch((error) => {
      console.log(`Login fail with error: ${error}`);
      loginUserFail(dispatch, error);
    });
};
