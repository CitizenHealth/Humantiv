import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from "./reducers";
import RouterComponent from "./components/Router";
import firebase from "react-native-firebase";

class App extends Component {
  
  componentWillMount() {
    // Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyCi5H4fcSpiHhqP9v5jGYz00axLeQB729k",
    //     authDomain: "test-94084.firebaseapp.com",
    //     databaseURL: "https://test-94084.firebaseio.com",
    //     projectId: "test-94084",
    //     storageBucket: "test-94084.appspot.com",
    //     messagingSenderId: "757200182779"
    // };
    firebase.perf().setPerformanceCollectionEnabled(true)
    firebase.app();
  }

  render() {
    const store = createStore(reducers, {}, composeWithDevTools(
      applyMiddleware(ReduxThunk)));

    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}

export default App;
