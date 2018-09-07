import firebase from "react-native-firebase";
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import { 
  NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER,
  LOGOUT_USER,
  GOOGLE_LOGIN_USER,
  FACEBOOK_LOGIN_USER
} from "./types";

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};
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

export const registerUser = ({ name, email, password }) => {
  return (dispatch) => {
    dispatch({ type: CREATE_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebase.analytics().logEvent('user_register', {provider: 'Email SignIn'});
      const user = firebase.auth().currentUser
      if (user) {
          user.updateProfile({ displayName: name })
      }
      loginUserSuccess(dispatch, user);
    })
    .catch((error) => { loginUserFail(dispatch, error); });
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      firebase.analytics().logEvent('user_login', {provider: 'Email Login'});
      const user = firebase.auth().currentUser
      loginUserSuccess(dispatch, user);
    })
    .catch((error) => { loginUserFail(dispatch, error); });
  };
};

const loginUserSuccess = (dispatch, user) => {
  //If user not verified with email then send verification email and wait
  dispatch(
    {
      type: LOGIN_USER_SUCCESS,
      payload: user._user
    });    
};

const loginUserFail = (dispatch, error) => {
  dispatch(
    {
      type: LOGIN_USER_FAIL,
      payload: error.message
    });
};

export const loginClearError = () => {
  return {
    type: LOGIN_USER_FAIL,
    payload: ""
  }
}

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
  GoogleSignin.configure({
//    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '847047929311-ibked2hj6k5263b55bcjfnpiemrbpans.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//    hostedDomain: '', // specifies a hosted domain restriction
    forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
    accountName: '', // [Android] specifies an account name on the device that should be used
  })
  return GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
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
      firebase.analytics().logEvent('user_login', {provider: 'Google'});
      loginUserSuccess(dispatch, user);
      console.log("Signed In with Google");
    })
    .catch((error) => {
      console.log(`Login fail with error: ${error}`);
      loginUserFail(dispatch, error);
    });
  })
  .catch((err) => {
    console.log("Play services error", err.code, err.message);
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
        firebase.analytics().logEvent('user_login', {provider: 'Facebook'});
        loginUserSuccess(dispatch, user);
      }
    })
    .catch((error) => {
      console.log(`Login fail with error: ${error}`);
      loginUserFail(dispatch, error);
    });
};
