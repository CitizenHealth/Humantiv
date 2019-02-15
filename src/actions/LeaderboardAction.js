import firebase from 'react-native-firebase';
import {LEADERBOARD_FETCH} from './types';
import {convertLeaderboardObjectsToArray} from '../business';

export const leaderboardFetch = () => {
  const { currentUser } = firebase.auth();
  const uid = currentUser.uid;

	return (dispatch) => {
    firebase.database().ref(`leaderboard`)
    .orderByChild('medit')
    .on("value", snapshot => {
      let leaderboard = {};
			snapshot.forEach(userInfo => {
				console.log(userInfo.key, userInfo.val());
				leaderboard[userInfo.key] = userInfo.val()
			});
      dispatch({ type: LEADERBOARD_FETCH, payload: convertLeaderboardObjectsToArray(leaderboard, uid) });
    }, error => {
      Sentry.captureMessage(`Leaderboard fetch failed.`, {
        level: SentrySeverity.Info
      });
      console.log(`Leaderboard Error: ${error}`);
    });
  };
};

