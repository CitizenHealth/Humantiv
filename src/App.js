import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import Reactotron from './configuration/ReactotronConfig';
import reducers from "./reducers";
import RouterComponent from "./components/Router";
import firebase from "react-native-firebase";
import { 
  Sentry,
  SentryLog,
  SentrySeverity
} from 'react-native-sentry';
import codePush from "react-native-code-push";
import { 
  Text,
  TextInput 
} from 'react-native';
import StorybookUI from '../storybook';

// To assign console.log to nothing   
if (!__DEV__) {
  console.log = () => {};
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

class App extends Component {
  constructor(props) {
    super(props)

    if (Text.defaultProps == null) 
      Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;

    if (TextInput.defaultProps == null) 
      TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }
  
  componentWillMount() {
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

    // set a callback after an event was successfully sent
    // its only guaranteed that this event contains `event_id` & `level`
    Sentry.setEventSentSuccessfully((event) => {
      // can also be called outside this block but maybe null
      // Sentry.lastEventId(); -> returns the last event_id after the first successfully sent event
      // Sentry.lastException(); -> returns the last event after the first successfully sent event
    });

    Sentry.setShouldSendCallback((event) => {
      return true; // if return false, event will not be sent
    });

    // Sentry.lastException(); // Will return the last sent error event
    // Sentry.lastEventId(); // Will return the last event id

    // export an extra context
    Sentry.setExtraContext({
      "a_thing": 3,
      "some_things": {"green": "red"},
      "foobar": ["a", "b", "c"],
      "react": true,
      "float": 2.43
    });

    // set the tag context
    Sentry.setTagsContext({
      "environment": "production",
      "react": true
    });

    // set the user context
    Sentry.setUserContext({
      email: "john@apple.com",
      userID: "12341",
      username: "username",
      extra: {
        "is_admin": false
      }
    });

    // set a custom message
    Sentry.captureMessage("TEST message", {
      level: SentrySeverity.Warning
    }); // Default SentrySeverity.Error

    // capture an exception
    Sentry.captureException(new Error('Oops!'), {
      logger: 'my.module'
    });

    // capture a breadcrumb
    Sentry.captureBreadcrumb({
      message: 'Item added to shopping cart',
      category: 'action',
      data: {
        isbn: '978-1617290541',
        cartSize: '3'
      }
    });

    // This will trigger a crash in the native sentry client
    //Sentry.nativeCrash();
  }

  render() {
    const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk), Reactotron.createEnhancer()))


    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}
App = codePush(App);
//export default __DEV__ ? StorybookUI : App; 
export default App
