import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from "./reducers";
import RouterComponent from "./components/Router";
import firebase from "react-native-firebase";
import { 
  Sentry,
  SentryLog 
} from 'react-native-sentry';

// To assign console.log to nothing   
if (!__DEV__) {
  console.log = () => {};
}

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
//    firebase.perf().setPerformanceCollectionEnabled(true)
    firebase.app();
    // disable stacktrace merging
    Sentry.config("https://0999f8401b0844a7b4279508d1d5bac9:5f9c3a1bdca04884aea7634085ce459e@sentry.io/275892", {
      deactivateStacktraceMerging: false, // default: true | Deactivates the stacktrace merging feature
      logLevel: SentryLog.None, // default SentryLog.None | Possible values:  .None, .Error, .Debug, .Verbose
      disableNativeIntegration: false, // default: false | Deactivates the native integration and only uses raven-js
      handlePromiseRejection: true // default: true | Handle unhandled promise rejections
      // sampleRate: 0.5 // default: 1.0 | Only set this if you don't want to send every event so e.g.: 0.5 will send 50% of all events
      // These two options will only be considered if stacktrace merging is active
      // Here you can add modules that should be ignored or exclude modules
      // that should no longer be ignored from stacktrace merging
      // ignoreModulesExclude: ["I18nManager"], // default: [] | Exclude is always stronger than include
      // ignoreModulesInclude: ["RNSentry"], // default: [] | Include modules that should be ignored too
      // ---------------------------------
    }).install();
  }

  render() {
    const store = createStore(
      reducers, 
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      composeWithDevTools(
        applyMiddleware(ReduxThunk))
      );

    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}

export default App;
