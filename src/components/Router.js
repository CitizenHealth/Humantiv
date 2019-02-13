import React from "react";
import { Scene, Router } from "react-native-router-flux";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import TutorialView from "./TutorialView";
import StartView from "./StartView";
import EmailConfirmationView from "./EmailConfirmationView";
import PasswordLostView from "./PasswordLostView";
import BottomTabView from "./BottomTabView";
import SimplePage from "./SimplePage";
import JourneyView from "./JourneyView";
import SettingsJourneyView from "./SettingsJourneyView";
import FeedFiltersView from "./FeedFiltersView";
import ManualLogView from "./ManualLogView";
import WebPageView from "./WebPageView";

const RouterComponent = () => {
  return (
    <Router
      navigationBarStyle={styles.navigationBarStyle}
      titleStyle={styles.titleStyle}
      navBarButtonColor="#E9222E"
    >
      <Scene key="root" hideNavBar gesturesEnabled={false} panHandlers={null}>
        <Scene key="start">
          <Scene key="load" component={StartView} animation='fade' hideNavBar initial />
        </Scene>
          <Scene key="auth">
          <Scene key="tutorial" component={TutorialView} animation='fade' hideNavBar initial/>
          <Scene key="register" component={RegisterForm} animation='fade' hideNavBar />
          <Scene key="termswebview" component={WebPageView} hideNavBar />
          <Scene key="login" component={LoginForm} animation='fade' hideNavBar />
          <Scene key="verify" component={EmailConfirmationView} hideNavBar />
          <Scene key="password" component={PasswordLostView} hideNavBar />
        </Scene>
        <Scene key="onboarding">
          <Scene key="personal" component={SimplePage} hideNavBar/>
          <Scene key="humanapi" component={SimplePage} hideNavBar/>
        </Scene>
        <Scene key="journeyflow">
          <Scene  key="journey" component={JourneyView} hideNavBar />         
        </Scene>
        <Scene key="main">
          <Scene
            key="tab"
            component={BottomTabView}
            hideNavBar
            initial
          />
          <Scene
            key="settingsjourney"
            component={SettingsJourneyView}
            hideNavBar            
          />
          <Scene
            key="feedfilters"
            component={FeedFiltersView}
            hideNavBar            
          />
          <Scene
            key="manuallog"
            component={ManualLogView}
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
