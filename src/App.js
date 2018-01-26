import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import firebase from "firebase";
import reducers from "./reducers";
import RouterComponent from "./components/Router";

class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyBmPwBEmiuxgLviGO5LGha83M4VRvH5LSk",
      authDomain: "health-score-6740b.firebaseapp.com",
      databaseURL: "https://health-score-6740b.firebaseio.com",
      projectId: "health-score-6740b",
      storageBucket: "health-score-6740b.appspot.com",
      messagingSenderId: "847047929311"
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}

export default App;
