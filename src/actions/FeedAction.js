import firebase from 'react-native-firebase';
import {FEED_FILTERS_FETCH, FEED_FILTERS_UPDATE, FEED_FETCH, FEED_ADD, FEED_DELETE} from './types';

export const addFeedStory = (story) => {
  const { currentUser } = firebase.auth();

  const time = story.time;
  var storyItem = {};
  storyItem[time] = story;
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/feed/stories`).orderByChild('time')
    .update(storyItem)
    .then(() => {
      dispatch({ type: FEED_ADD });
    });
  };
};

export const removeFeedStory = (id) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    const ref = firebase.database().ref(`/users/${currentUser.uid}/feed/stories/${id}`)
    ref.remove();
  };
}

export const filtersSave = (filter) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/feed/filters`)
    .update(filter)
  };
};

export const fetchFeedFilters = () => {
  const {currentUser} = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/feed/filters`)
    .on("value", snapshot => {
      let data = snapshot.val();
      dispatch({ type: FEED_FILTERS_FETCH, payload: data });
    });
  }
}

export const fetchFeedStories = () => {
  const {currentUser} = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/feed/stories`)
    .on("value", snapshot => {
      let data = snapshot.val();
      dispatch({ type: FEED_FETCH, payload: data });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }
}
