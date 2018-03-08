import React from "react";
import { Scene, Router } from "react-native-router-flux";
import LoginForm from "./LoginForm";
import TutorialView from "./TutorialView";
import ProfileView from "./ProfileView";
import StartView from "./StartView";
import EmailConfirmationView from "./EmailConfirmationView";
import PasswordLostView from "./PasswordLostView";
import HomeView from "./HomeView";
import TabView from "./TabView";
import SimplePage from "./SimplePage";

const RouterComponent = () => {
  return (
    <Router
      navigationBarStyle={styles.navigationBarStyle}
      titleStyle={styles.titleStyle}
      navBarButtonColor="#E9222E"
    >
      <Scene key="root" hideNavBar>
        <Scene key="start">
          <Scene key="load" component={StartView} animation='fade' hideNavBar initial />
        </Scene>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} animation='fade' hideNavBar initial/>
          <Scene key="verify" component={EmailConfirmationView} hideNavBar />
          <Scene key="password" component={PasswordLostView} hideNavBar />
        </Scene>
        <Scene key="onboarding">
          <Scene key="tutorial" component={TutorialView} hideNavBar initial/>
          <Scene key="personal" component={SimplePage} hideNavBar/>
          <Scene key="humanapi" component={SimplePage} hideNavBar/>
        </Scene>
        <Scene key="main">
          <Scene
            key="tab"
            component={TabView}
            hideNavBar
            initial
          />
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
