import React from "react";
import { Scene, Router } from "react-native-router-flux";
import LoginForm from "./LoginForm";
import ProfileView from "./ProfileView";
import StartView from "./StartView";
import EmailConfirmationView from "./EmailConfirmationView";
import PasswordLostView from "./PasswordLostView";

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
          <Scene key="verify" component={EmailConfirmationView} hideNavBar />
          <Scene key="password" component={PasswordLostView} hideNavBar />
        </Scene>
        <Scene key="main">
          <Scene
            key="profile"
            component={ProfileView}
            hideNavBar
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
