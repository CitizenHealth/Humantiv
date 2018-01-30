import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import LoginForm from "./LoginForm";
import ProfileView from "./ProfileView";
import StartView from "./StartView";

const RouterComponent = () => {
  return (
    <Router
      navigationBarStyle={styles.navigationBarStyle}
      titleStyle={styles.titleStyle}
      navBarButtonColor="#E9222E"
    >
      <Scene key="root" hideNavBar>
        <Scene key="start">
          <Scene key="load" component={StartView} hideNavBar initial />
        </Scene>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} hideNavBar />
        </Scene>
        <Scene key="main">
          <Scene
            key="profile"
            component={ProfileView}
            initial
          />
        </Scene>
      </Scene>
    </Router>
  );
};

const styles = {
  navigationBarStyle: {
    backgroundColor: "white"
  },
  titleStyle: {
    fontSize: 22,
    color: "#E9222E",
  }
};

export default RouterComponent;
