import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from "./reducers";
import RouterComponent from "./components/Router";

class App extends Component {

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
