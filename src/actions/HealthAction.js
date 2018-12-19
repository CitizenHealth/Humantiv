import firebase from 'react-native-firebase';
import {HEALTH_SCORE_SAVE} from './types';

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
