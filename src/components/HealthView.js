import React, {Component} from "react";
import { 
    StyleSheet, 
    View, 
    Text,
    Image, 
    Platform,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Linking   
} from 'react-native';
import { scale } from "react-native-size-matters";
import {connect} from "react-redux";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HGraph from 'react-native-hgraph';
import Spinner from "react-native-spinkit";
import {
    Feed,
    Avatar, 
    IconButton,
    ScoreCard,
    ValueCard,
    GraphCard,
    GraphBarCard,
    Icon as HMIcon
} from './common';
import { Actions } from "react-native-router-flux";
import RNHumanAPI from 'react-native-human-api';
import { 
    dataSave,
    dataAdd,
    dataFetch,
    walletFetch,
    fetchFeedFilters,
    fetchFeedStories,
    addFeedStory,
    removeFeedStory,
    removeAllFeedStories,
    humanAPIFetch,
    healthScoreSave,
    addHealthTimeSeries,
    timeseriesMeditFetch,
    timeseriesScoreFetch,
    addMeditTimeSeries,
    addHealthScoreTimeSeries,
    timeseriesActivityFetch,
    timeseriesStepsFetch,
    timeseriesHeartrateFetch,
    timeseriesSleepFetch,
    deviceInfoFetch
  } from "../actions";
import {Fonts} from '../resources/fonts/Fonts';
import firebase from "react-native-firebase";
import { 
  theme, 
  primaryBackgroungColor,
  graphGreyColor,
  primaryWhiteColor,
  hGraphColor
 } from './themes';
import {
  formatNumbers,
  areMeasurementArraysEquals,
  convertTimeArrayToObject,
  convertMeditFromObjectToArray
} from '../business/Helpers';
import {
  primaryGreyColor,
  primaryBlueColor
} from './themes/theme';
import {
  ModalScreen,
  ModalDialog 
} from './custom'; 
import {modalMessages} from './themes';
import Intercom from 'react-native-intercom';
import Images from "../resources/images";
import {
  Sentry,
  SentrySeverity,
  SentryLog
} from 'react-native-sentry';
import {
  Mediflux, 
  createMedifluxSource, 
  MedifluxLink} from '../business/mediflux'
import {
  processDailyMedit,
  getActivityMedits,
  getSleepMedits,
  getStepMedits
} from '../business/medit'
import {
  healthScores,
  getHealthScore,
  processDailyHealthScore
} from '../business/healthscore';
import {MeditCoefficients} from '../business/medit/configuration/Coefficients';
import AppleHealthKit from 'rn-apple-healthkit';

const baseURL = 'https://connect.humanapi.co/embed?';
const clientID = 'b2fd0a46e2c6244414ef4133df6672edaec378a1'; //Add your clientId here
const clientSecret = '1de96f660418ba961d6f2de259f01aaed5da3445';
const appKey = 'a6c69376d010aed5da148c95e771d27e7459e23d';
const finishURL = 'https://connect.humanapi.co/blank/hc-finish';
const closeURL = 'https://connect.humanapi.co/blank/hc-close';

class HealthView extends Component {

    constructor(props) {
      super(props);

      this.state = {
        visibleModal: false,
        visibleDismissModal: false,
        visibleMedifluxVisible: false,
        textModal: "",
        textDismissModal: "",
        healthScore: "",
        meditLoading: false,
        healthscoreLoading: false,
        scoreLoading: false,
        stepsLoading: false,
        activityLoading: false,
        sleepLoading: false,
        heartrateLoading: false,
        healthData: {
          healthData: [],
          healthScore: 0
        }
      }
    }

    componentWillMount () {  
      const { user } = this.props; 
      
      if (user) {
        Intercom.registerIdentifiedUser({ userId: user.uid });
        Intercom.updateUser({
          // Pre-defined user attributes
          email: user.email,
          name: user.displayName,
        });
        Intercom.logEvent('viewed_screen', { extra: 'metadata' });
        Intercom.handlePushMessage();
      }
      this.props.dataFetch({type: "timestamps"});
      this.props.dataFetch({type: "feed"});
      this.props.dataFetch({type: "health"});
      this.props.dataFetch({type: "humanapi"});

      this.props.walletFetch({type: "wallet"});

      this.props.fetchFeedFilters();
      this.props.fetchFeedStories();

      this.props.timeseriesScoreFetch();
      this.props.timeseriesMeditFetch();

      // Fetch the data from 
      this.props.dataFetch({type: "profile"});

      // this.props.dataFetch({type: "notifications"});
      firebase.analytics().setCurrentScreen('My Health Screen', 'MyHealthView');
    }

    componentWillUnmount() {
       Intercom.removeEventListener(
       Intercom.Notifications.UNREAD_COUNT, this._onUnreadChange);      
   }
  
  _onUnreadChange = ({ count }) => {
      console.log(`INTERCOM COUNT: ${count}`);  
      // const notification = new firebase.notifications.Notification()
      // .setNotificationId('notificationId')
      // .setTitle('Test')
      // .setBody('You have a message from the Humentiv team')
      // .setData({
      //   key1: 'value1',
      //   key2: 'value2',
      // });
      // firebase.notifications().displayNotification(notification);  
  }

  componentDidMount() {
      // Init Intercom
      Intercom.registerForPush();   
      Intercom.addEventListener(
      Intercom.Notifications.UNREAD_COUNT, this._onUnreadChange);       
    }

    shouldComponentUpdate(nextProps, nextState) {
      return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentWillReceiveProps(nextProps) {
      const {
        activity, 
        sleep, 
        steps,
        heartrate,
        children,
      } = nextProps;

//      const nativeTracker = (Platform.OS === "ios") ? "apple_health" : "google_fit";
      const nativeTracker = "apple_health";
      const isNativeTracker = (children.profile && (children.profile[nativeTracker]!= undefined)) ? children.profile[nativeTracker] : undefined;
      let isNativeChanged = (children.profile && (children.profile[nativeTracker] !== undefined)) 
                            ? (this.props.children.profile === undefined) || (children.profile[nativeTracker] !== this.props.children.profile[nativeTracker]) : false;

      if (isNativeChanged) {
        const stepsTimestamp = (children.timestamps && children.timestamps.steps) ? children.timestamps.steps : null;
        const activityTimestamp = (children.timestamps && children.timestamps.activity) ? children.timestamps.activity : null;
        const sleepTimestamp = (children.timestamps && children.timestamps.sleep) ? children.timestamps.sleep : null;
        const meditTimestamp = (children.timestamps && children.timestamps.medit) ? children.timestamps.medit : null;
        const scoreTimestamp = (children.timestamps && children.timestamps.score) ? children.timestamps.score : null;
        const healthscore = (children.health && children.health.score && children.health.score.healthscore) ? children.health.score.healthscore : 0;
        const stepsTimestampValue = (children.timestamps && children.timestamps.steps_value) ? children.timestamps.steps_value : 0;
        const activityTimestampValue = (children.timestamps && children.timestamps.activity_value) ? children.timestamps.activity_value : 0;
        const sleepTimestampValue = (children.timestamps && children.timestamps.sleep_value) ? children.timestamps.sleep_value : 0;
        const meditTimestampValue = (children.timestamps && children.timestamps.medit_value) ? children.timestamps.medit_value : 0;
        const scores = (children.health && children.health.score) ? children.health.score : [];
        const access_token = (children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : '';
        // Maybe check if the device has changed.
        this.setState({ 
          healthscoreLoading: true,
          meditLoading: true,
          scoreLoading: true,
          stepsLoading: true,
          activityLoading: true,
          sleepLoading: true,
          heartrateLoading: true
        });

        let datasource = createMedifluxSource((isNativeTracker) ? nativeTracker : 'humanapi', {accessToken: access_token});
        let mediflux = new Mediflux(datasource);
        mediflux.getSources()
        .then ( sources => {
          console.log(sources);
          if (sources.length > 0) {
            this.props.deviceInfoFetch(sources[0]);
          }
          this.props.dataSave({type: "profile", data: {devices: sources[0].device}});
          this.props.dataSave({type: "profile", data: {sources: sources[0].source}});
          console.log(`PROMISE - getAllTimeSeries - BEFORE`)
          return mediflux.getAllTimeSeries();
        })
        .then( data => {
          console.log(`PROMISE - getAllTimeSeries - LAST`)
          // Order of data is steps, activity, sleep, heartrate
          this.props.timeseriesStepsFetch(data[0]);
          this.props.timeseriesActivityFetch(data[1]);
          this.props.timeseriesSleepFetch(data[2]);
          this.props.timeseriesHeartrateFetch(data[3]);
          console.log('Process Timeseries');
          return data;
        })
        .then( (data) => {
          this.setState({
            meditLoading: false,
            scoreLoading: false,
            stepsLoading: false,
            activityLoading: false,
            sleepLoading: false,
            heartrateLoading: false
          });
          // HealthScore
          console.log('Process Health Score');
          let dailyHealthScore = processDailyHealthScore(scores, scoreTimestamp, healthscore, data[0], data[1], data[2]);

          this.props.addHealthScoreTimeSeries(convertTimeArrayToObject(dailyHealthScore.dailyHealthScores, "score"));
          this.props.dataSave({type: "timestamps", data: {
            score: dailyHealthScore.scoreTimeStamp,
          }}); 
          this.props.healthScoreSave({
            healthscore: dailyHealthScore.healthscore
          }); 
          this.setState({
            healthData: getHealthScore(data[0], data[1], data[2])
          });
          return data;
        })
        .then( (data) => {
          this.setState({
            healthscoreLoading: false,
          })
          // Medit 
          // After all physical metrics are pulled, we calculate the daily Medit history
          let dailyMedit = processDailyMedit(meditTimestamp, meditTimestampValue, data[0], data[1], data[2]);
          this.props.addMeditTimeSeries(convertTimeArrayToObject(dailyMedit.dailyMedits, "medit"));
          this.props.dataSave({type: "timestamps", data: {
            medit: dailyMedit.meditTimeStamp,
            medit_value: dailyMedit.meditTimeStampValue
          }}); 
          this.setState({
            meditLoading: false,
          })

          // Medit earned
          let totalMedits = 0;

          // Medit from steps
          if (stepsTimestamp) {
            let stepMedits = getStepMedits(data[0], stepsTimestamp, stepsTimestampValue)
            // Generate Medits
            let stepMeditCount = parseInt(stepMedits.medits);
            if (Number.isInteger(stepMeditCount)) {
              totalMedits += stepMeditCount;
              if (stepMeditCount > 0) {
                // Add medit to feed
                const story = {
                  title: "Your steps earned you",
                  preposition: "",
                  value: `${stepMedits.medits} Medits`,
                  time: Math.round((new Date()).getTime() / 1000),
                  type: "stepsmedits"
                }
                this.props.addFeedStory(story);
              }
              this.props.dataSave({type: "timestamps", data: {
                steps: stepMedits.timestamp,
                steps_value: stepMedits.value
              }});
            } else {
              Sentry.captureMessage(`Step Medit is not an Int: ${stepMeditCount}`, {
                level: SentrySeverity.Info
              });        
            }
          }

          if (sleepTimestamp) {
            let sleepMedits = getSleepMedits(data[1], sleepTimestamp, sleepTimestampValue)
            // Generate Medits
            let sleepMeditCount = parseInt(sleepMedits.medits);
            if (Number.isInteger(sleepMeditCount)) {
              totalMedits += sleepMeditCount;
              if (sleepMeditCount > 0) {
                // Add medit to feed
                const story = {
                  title: "Your sleep earned you",
                  preposition: "",
                  value: `${sleepMedits.medits} Medits`,
                  time: Math.round((new Date()).getTime() / 1000),
                  type: "sleepmedits"
                }
                this.props.addFeedStory(story);
              }
              this.props.dataSave({type: "timestamps", data: {
                sleep: sleepMedits.timestamp,
                sleep_value: sleepMedits.value
              }});
            } else {
              Sentry.captureMessage(`Sleep Medit is not an Int: ${sleepMeditCount}`, {
                level: SentrySeverity.Info
              });        
            }
          }

          if (activityTimestamp) {
            let activityMedits = getActivityMedits(data[2], activityTimestamp, activityTimestampValue)
            // Generate Medits
            let activityMeditCount = parseInt(activityMedits.medits);
            if (Number.isInteger(activityMeditCount)) {
              totalMedits += activityMeditCount;
              if (activityMeditCount > 0) {
                // Add medit to feed
                const story = {
                  title: "Your activity earned you",
                  preposition: "",
                  value: `${activityMedits.medits} Medits`,
                  time: Math.round((new Date()).getTime() / 1000),
                  type: "activitymedits"
                }
                this.props.addFeedStory(story);
              }
              this.props.dataSave({type: "timestamps", data: {
                activity: activityMedits.timestamp,
                activity_value: activityMedits.value
              }});
            } else {
              Sentry.captureMessage(`Activity Medit is not an Int: ${activityMeditCount}`, {
                level: SentrySeverity.Info
              });        
            }
          }

          totalMedits = totalMedits * MeditCoefficients.master_coefficient;
          
          if (Number.isInteger(totalMedits)) {
            this.props.dataAdd({type: "wallet", item: "medits", data: totalMedits});
          }
        })
        .catch( error => {
          this.setState({
            healthscoreLoading: false,
            meditLoading: false,
            scoreLoading: false,
            stepsLoading: false,
            activityLoading: false,
            sleepLoading: false,
            heartrateLoading: false
          });
          Sentry.captureMessage(`Time series fetch error: ${error}`, {
            level: SentrySeverity.Info
          });
        });
      }
    }

    dismissNativeSource() {
      this.setState({visibleModal: false});
    }
  
    acceptNativeSource() {
      this.setState({visibleModal: false});
    }

    setTimestamp(type, data) {
      if (!data || data.length === 0) {
        return;
      }
      let timestamp = data[0].time;
      // Set timestamp
      var obj = {};
      obj[type] = timestamp;
      this.props.dataSave({type: "timestamps", data: obj});
    }

    launchIntercom() {
      Intercom.displayMessenger();
    }

    saveHumanAPIPublicToken(token) {
        this.props.dataSave({type: "humanapi", data: {public_token: token}});
    }
    
    sendAuth = (data) => {
        // send for auth_url with additional info
        console.log('auth')
        console.log(data)
        // data.client_id
        // data.human_id
        // data.session_token
    }

    connectMediFlux = () => {
      this.setState({visibleMedifluxVisible: true});
    }

    closeMedifluxLink = () => {
      this.setState({visibleMedifluxVisible: false});
    }

    deviceNotSupported = () => {
      this.setState({
        visibleMedifluxVisible: false
      });
      Intercom.displayMessageComposerWithInitialMessage('Send us the brand and name of your device: ');
    }

    connectNativeSource = () => {
      this.setState({
        visibleMedifluxVisible: false
      });
      // If Apple Health is connected then use it
      if (Platform.OS === 'ios') {
        let options = {
          permissions: {
              read: ["Height", "Weight", "DateOfBirth", "StepCount", "HeartRate", "SleepAnalysis", "AppleExerciseTime", "BiologicalSex"]
         }
        };
        
        AppleHealthKit.initHealthKit(options: Object, (err: string, results: Object) => {
          if (err) {
              console.log("error initializing Healthkit: ", err);
              return;
          }
      
          this.props.dataSave({type: "profile", data: {apple_health: true}});
          // TODO: 
          

          // Height Example
          AppleHealthKit.getDateOfBirth(null, (err: Object, results: Object) => {
          if (err) {
            console.log(`Date of Birth ERROR: ${err}`);
            return;
          }
          console.log(`Date of Birth: ${results}`);
          }); 
        });
      } else {

      }
    }

    connectHumanAPI = () => {
        const {children} = this.props;
        const public_token = (children.humanapi && children.humanapi.public_token) ? children.humanapi.public_token : null;
        const clientUserId = this.props.user.uid;
        
        const humanAPI = new RNHumanAPI()
        const options = (public_token) ? {
            client_id: clientID,
            client_user_id: clientUserId,
            public_token: public_token,
            auth: (data) => this.sendAuth(data),
            auth_url: 'https://us-central1-health-score-6740b.cloudfunctions.net/humanAPITokenExchange',
            success: (data) => {
              // save publicToken
              this.saveHumanAPIPublicToken(data.public_token);
              console.log(`Human API Callback: ${data}`);
              this.props.humanAPIFetch(data.public_token);
              this.setState({
                visibleMedifluxVisible: false
              });
            },  // callback when success with auth_url
            cancel: () => console.log('cancel')  // callback when cancel
        } : {
            client_id: clientID,
            client_user_id: clientUserId,
            auth: (data) => this.sendAuth(data),
            auth_url: 'https://us-central1-health-score-6740b.cloudfunctions.net/humanAPITokenExchange',
            success: (data) => {
              // save publicToken
              this.saveHumanAPIPublicToken(data.public_token);
              this.props.humanAPIFetch(data.public_token);
              this.setState({
                visibleMedifluxVisible: false
              });
             },  // callback when success with auth_url
            cancel: () => console.log('cancel')  // callback when cancel
        }
        humanAPI.onConnect(options)
    }

    refreshDataSources = () => {
    }
    
    clearFeed() {
      this.setState({
        visibleDismissModal: true,
        textDismissModal: modalMessages.dismissfeed
      });
    }

    onDismiss() {
      this.props.removeAllFeedStories();
      this.setState({
        visibleDismissModal: false,
        textDismissModal: ""
      });
    }

    onNoDismiss() {
      this.setState({
        visibleDismissModal: false,
        textDismissModal: ""
      });
    }

    onWeightPress() {
      const story = {
        title: "Your weight",
        preposition: "is",
        value: "182 lbs",
        time: Math.round((new Date()).getTime() / 1000),
        type: "weight"
      }
      this.props.addFeedStory(story);
    }

    onSleepPress() {
      const story = {
        title: "Too little sleep.",
        preposition: "",
        value: "Please sleep more!",
        time: Math.round((new Date()).getTime() / 1000),
        type: "sleep"
      }
      this.props.addFeedStory(story);
    }

    onHeartRatePress() {
      const story = {
        title: "Heart rate",
        preposition: "was",
        value: "67 bpm",
        time: Math.round((new Date()).getTime() / 1000),
        type: "heartrate"
      }
      this.props.addFeedStory(story);
    }

    renderProfileImage() {
        const { user } = this.props;
        const { avatarStyle } = this.props;
        if (user && user.photoURL) {
            return (
            <Avatar style={avatarStyle}
                imageURL= {user.photoURL}
            />
            );
        }
        return (
            <IconButton>
            <FontAwesome>{Icons.userCircle}</FontAwesome>
            </IconButton>
        );
    }

    renderGraphTiles() {
        const {
          meditLoading,
          scoreLoading,
          stepsLoading,
          activityLoading,
          sleepLoading,
          heartrateLoading,
        } = this.state;

        const {
          children, 
          activity,
          steps,
          sleep,
          heartrate,
          weight,
          stress,
          medit,
          score
          } = this.props;

        const {
            sectionTitleStyle,
            sectionContainerStyle,
            cardsStyle,
            cardsContainer
        } = styles;

        const {
            iconStyle,
            iconTextStyle
          } = theme;
        
        const screenWidth = Dimensions.get('window').width;
        const graphCardWidth = (screenWidth - 30)/2;
        const graphScoreCardWidth = screenWidth -20;

        const meditTimestamp = (children.timestamps && children.timestamps.medit) ? children.timestamps.medit : null;

        let scores = []
        if (children.health && children.health.score) {
          scores = children.health.score;
        }

        // convert the list of objects into an array
        var arrayObj = Object.keys(scores).map((key) => {
          return {time: Number(key), value: scores[key]};
        }).reverse();

//        if (needToSaveHealthScore(arrayObj)) {
        // Overwrite the daily healthscore by setting the timestamp to the current day at 00:00:00 AM
        let dayBaseTime = new Date();
        dayBaseTime.setHours(0);
        dayBaseTime.setMinutes(0);
        dayBaseTime.setSeconds(0);
        dayBaseTime.setMilliseconds(0);
//        this.props.addHealthTimeSeries("score", {time: Math.round(dayBaseTime.getTime() / 1000), value: this.state.healthData.healthScore});
//        }

        const activities = (activity) ? activity : [];
        const stepss = (steps) ? steps : [];
        const sleeps = (sleep) ? sleep : [];
        const heartrates = (heartrate) ? heartrate : [];
        const medits = (medit) ? medit : [];
        const scoress = (score) ? score : [];;

        return (
            <View>
                <View style={sectionContainerStyle}>
                    <Text style={sectionTitleStyle}>
                        My stats
                    </Text>
                    <IconButton
                        viewStyles={iconStyle}
                        textStyles={[iconTextStyle, {color:graphGreyColor}]}
                    >
                    </IconButton>
                </View>
                <View style={
                    [cardsContainer,
                    {height: 4*graphCardWidth+20}]}>
                    <View style={cardsStyle}>
                        <GraphCard
                            title= "Health Score"
                            unit= ""
                            data= {convertMeditFromObjectToArray(scoress)}
                            rules= {healthScores.healthscore}
                            width= {graphScoreCardWidth}
                            height= {graphCardWidth}
                            loading= {scoreLoading}
                        />
                    </View>
                      <View style={cardsStyle}>
                        <GraphCard
                            title= "Steps"
                            unit= "steps"
                            data= {stepss}
                            rules= {healthScores.steps}
                            width= {graphCardWidth}
                            height= {graphCardWidth}
                            loading= {stepsLoading}
                        />
                        <GraphCard
                            title= "Activity"
                            unit= "minutes"
                            data= {activities}
                            rules= {healthScores.activity}
                            width= {graphCardWidth}
                            height= {graphCardWidth}
                            loading= {activityLoading}
                        />
                    </View>
                    <View style={cardsStyle}>
                        <GraphCard
                            title= "Sleep"
                            unit= "hours"
                            data= {sleeps}
                            rules= {healthScores.sleep}
                            width= {graphCardWidth}
                            height= {graphCardWidth}
                            loading= {sleepLoading}
                        />
                        <GraphCard
                            title= "Heart Rate"
                            unit= "bpm"
                            data= {heartrates}
                            rules= {healthScores.heartrate}
                            width= {graphCardWidth}
                            height= {graphCardWidth}
                            loading= {heartrateLoading}
                        />
                    </View>
                    <View style={cardsStyle}>
                        <GraphBarCard
                            title= "Daily Medit Earnings"
                            unit= ""
                            data= {convertMeditFromObjectToArray(medits)}
                            timestamp= {meditTimestamp}
                            rules= {healthScores.healthscore}
                            width= {graphScoreCardWidth}
                            height= {graphCardWidth}
                            loading= {meditLoading}
                        />
                    </View>
                </View>
            </View>
        )
    }

    renderActivityFeed() {
        const {
            sectionTitleStyle,
            sectionContainerStyle,
            iconTextStyle,
            iconStyle
        } = styles;

        const screenWidth = Dimensions.get('window').width;
        const activityCardWidth = (screenWidth - 20);

        return (
            <View>
                <View style={sectionContainerStyle}>
                    <Text style={sectionTitleStyle}>
                        Activity
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                      }}
                    >
                    <TouchableOpacity 
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 44,
                        width: 44,
                        marginLeft: 5,
                        marginRight: 5,
                        opacity: (Object.keys(this.props.stories).length > 0) ? 1 : 0.3
                      }}
                      onPress={() => {this.clearFeed()}}
                      disabled={(Object.keys(this.props.stories).length > 0) ? false : true}
                      >
                        <Image 
                            style={{ 
                              width: 28, 
                              height: 28
                            }} 
                            source={Images.img_dismiss_all} 
                          /> 
                      </TouchableOpacity>                   
                      <IconButton
                          onPress={() => {Actions.feedfilters()}}
                          viewStyles={iconStyle}
                          textStyles={[iconTextStyle, {color:graphGreyColor}]}
                      >
                          <HMIcon 
                            name="sandwich"
                            size= {16}
                          />
                      </IconButton>
                    </View>
                </View>
                <Feed 
                    height= {activityCardWidth/5}
                    width= {activityCardWidth}
                    stories= {this.props.stories}
                    filters= {this.props.filters}
                    onSwipe= {this.props.removeFeedStory}
                />
            </View>
        )
    }

  renderActivity() {
    const {healthscoreLoading} = this.state;
    const {cardsStyle} = styles;
    const {
      activity,
      sleep,
      steps,
      score,
      children
      } = this.props;

    const public_token = (children.humanapi && children.humanapi.public_token) ? children.humanapi.public_token : null;
    const human_id = (children.humanapi && children.humanapi.human_id) ? children.humanapi.human_id : null;
    const access_token = (children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null;

    // Get humanId and accessToken from the humanapi table
    // console.log(`WEBVIEW public_token: ${public_token}`);
    // console.log(`WEBVIEW human_id: ${human_id}`);
    // console.log(`WEBVIEW access_token: ${access_token}`);


    const medits = (children.wallet) ? (children.wallet.medits ? children.wallet.medits : 0) : 0;
    const mdx = (children.wallet) ? (children.wallet.mdx ? children.wallet.mdx : 0) : 0 ;
    const screenWidth = Dimensions.get('window').width;
    const valueCardWidth = (screenWidth - 30)/2;
    const hgraphWidth = screenWidth - 120;
    const applehealth = (children.profile) ? children.profile.apple_health : false;
    const scoress = convertMeditFromObjectToArray(score);
    const latestHealthScore = (scoress) ? (scoress.length > 0 ? Math.round(scoress[0].value) : '') : "Add your first data source";

    return (
        <View style={{flex: 1, marginTop: 5}}>
            <View style={cardsStyle}>
                <ValueCard 
                    color= "#3ba4f9"
                    icon= "medit"
                    title= "Medit Balance"
                    value= {formatNumbers(medits.toString())}
                    width= {valueCardWidth}
                />
                <TouchableOpacity 
                  style={{width: valueCardWidth}} 
                  onPress={() => Linking.openURL('https://www.startengine.com/citizenhealth')}
                >
                  <ValueCard
                      color= "#34d392"
                      icon= "medex"
                      title= "MDX Balance"
                      value= "Invest"
                      width= {valueCardWidth}
                      logo= {false}
                  />
                </TouchableOpacity>

            </View>
            <ScoreCard 
                style={{
                title: "Health Graph",
                buttonTitle: "Add data source",
                footerTitle: "Sync with devices",
                backgroundColor: "#fff",
                }}
                onPressHeader= {() => {this.setState({visibleMedifluxVisible: true})}}
                onPressFooter= {this.refreshDataSources}
                footerDisabled= {(children.humanapi && children.humanapi.access_token) ? false : true}
            >
                {(!healthscoreLoading) ? <HGraph
                    scoreFontColor= {(applehealth) ? "#3ED295" : (((children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null) === null) ? "#b7daff" : '#3ED295'}
                    scoreFontSize={(applehealth) ? 50 : (((children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null) === null) ? 16 : 50}
                    width= {hgraphWidth}
                    height= {hgraphWidth}
                    pathColor= "#b7daff"
                    score={(applehealth) ? latestHealthScore : (((children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null) === null) ? "Add your first data source" : (latestHealthScore === -1) ? "" : latestHealthScore} 
                    healthyRangeFillColor={(applehealth) ? hGraphColor : (((children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null) === null) ?  primaryWhiteColor : hGraphColor}
                    margin={
                    {top: 50,
                    right: 50, 
                    bottom: 50, 
                    left: 50}}
                    showAxisLabel={true}
                    fontSize={12}
                    fontColor="#b6bbc4"
                    pointRadius = {3}
                    axisLabelOffset = {4}
                    axisLabelWrapWidth = {5}
                    donutHoleFactor = {.50}
                    pointLabelOffset = {4}
                    data= {this.state.healthData.healthData}
                /> : <View style={{
                      justifyContent: "center",
                      alignItems: 'center',
                      backgroundColor: primaryBackgroungColor,
                      flexDirection: "column",
                      flex: 1,
                      width: hgraphWidth + 100,
                      height: hgraphWidth + 100
                    }}>
                      <Spinner 
                        isVisible={true}
                        size={hgraphWidth/4}
                        type='ThreeBounce' 
                        color={primaryBlueColor}
                      />
                    </View>
                }
            </ScoreCard>
          </View>
    );
    }
    render() {
        const {
            button,
            pageStyle,
            headerStyle,
            textStyle,
            iconStyle,
            iconTextStyle
        } = styles;

        const {
          activity, 
          sleep, 
          steps,
          heartrate,
          children,
          isNativeAvailable
        } = this.props;  

        const sources = (children.profile && (children.profile.sources!= undefined)) ? [children.profile.sources] : undefined;
        const devices = (children.profile && (children.profile.devices!= undefined)) ? [children.profile.devices] : undefined;

        return (
            <View style={pageStyle}>
                <ScrollView > 
                    <View style={headerStyle}>
                        {this.renderProfileImage()}
                        <Text style={textStyle}> My health </Text>
                        <IconButton
                          onPress={() => {this.launchIntercom()}}
                          viewStyles={iconStyle}
                          textStyles={[iconTextStyle, {color:graphGreyColor}]}
                        >
                          <FontAwesome
                            style={{color: primaryBlueColor}}
                          > 
                            {Icons.comments}
                          </FontAwesome>
                      </IconButton>                 
                    </View>                  
                    {this.renderActivity()}
                    {this.renderGraphTiles()}
                    {this.renderActivityFeed()}                  
                </ScrollView > 
                <ModalScreen
                  visible={this.state.visibleModal}
                  label={this.state.textModal.message}
                  cancelLabel={this.state.textModal.cancel}
                  acceptLabel={this.state.textModal.accept}
                  onCancelPress={this.dismissNativeSource.bind(this)}
                  onAcceptPress={this.acceptNativeSource.bind(this)}
                >
                </ModalScreen>
                <ModalDialog
                  visible={this.state.visibleDismissModal}
                  label={this.state.textDismissModal.message}
                  cancelLabel={this.state.textDismissModal.cancel}
                  acceptLabel={this.state.textDismissModal.accept}
                  onCancelPress={this.onNoDismiss.bind(this)}
                  onAcceptPress={this.onDismiss.bind(this)}
                >
                </ModalDialog>
                <MedifluxLink
                  visible={this.state.visibleMedifluxVisible}
                  onClose = {() => {this.closeMedifluxLink()}}
                  onNativeSourceClick = {() => {this.connectNativeSource()}}
                  onSourceClick = {() => {this.connectHumanAPI()}}
                  onCantFindClick = {(selected) => {this.deviceNotSupported(selected)}}
                  selected = {sources}
                  isNativeAvailable = {isNativeAvailable}
                />
                {/* <ActionButton 
                  size={44}
                  offsetX={20}
                  offsetY={20}
                  buttonColor="rgba(231,76,60,1)">
                  <ActionButton.Item 
                    buttonColor='#9b59b6' 
                    title="Log your sleep" 
                    size={44}
                    onPress={() => this.onSleepPress()}>
                    <FontAwesome 
                      style={styles.actionButtonIcon}
                    >
                      {Icons.bed}  
                    </FontAwesome>
                  </ActionButton.Item>
                  <ActionButton.Item 
                    buttonColor='#f15b58' 
                    title="Measure your heart rate"
                    size={44} 
                    onPress={() => this.onHeartRatePress()}>
                    <FontAwesome 
                      style={styles.actionButtonIcon}
                    >
                      {Icons.heartbeat}  
                    </FontAwesome>
                  </ActionButton.Item>
                  <ActionButton.Item 
                    buttonColor='#1abc9c' 
                    size={44}
                    title="Log your weight" 
                    onPress={() => {this.onWeightPress()}}>
                    <FontAwesome 
                      style={styles.actionButtonIcon}
                    >
                      {Icons.balanceScale}  
                    </FontAwesome>
                  </ActionButton.Item>
                </ActionButton>        */}
            </View>
            );
    }
}

const styles = StyleSheet.create({
    pageStyle: {
        backgroundColor: primaryBackgroungColor,
        flexDirection: "column",
        alignItems: "stretch",
        flex: 1
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: scale(60),
        alignItems: 'center',
        alignContent: 'stretch',
        backgroundColor: primaryBackgroungColor
    },
   cardsStyle: {
        flex: 1,
        justifyContent: "space-between",
        alignContent: "center",
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10
    },
    cardsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between",
        alignContent: "center"
    },
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: scale(80),
    },
    textStyle: {
        flex: 4,
        textAlign: 'center',
        fontSize: 20,
        color: graphGreyColor,
        fontFamily: Fonts.regular
    },
    button: {
        flexDirection: 'row',
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#337ab7',
        marginBottom: 20
    },
    sectionContainerStyle: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 10,
    },
    sectionTitleStyle: {
        fontSize: 18,
        fontWeight: "400",
        color: graphGreyColor,
        paddingLeft: 10,
        fontFamily: Fonts.regular
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
});

const mapStateToProps = (state) => {
    const {user} = state.auth;
    const {children} = state.data;
    const {stories, filters} = state.feed;
    const {medit, score} = state.timeseries;
    const {activity, steps, heartrate, sleep, weight, stress} = state.timeseries;
    const {sources, devices, isNativeSourceAvailable} = state.device;

    return {
        user, children, stories, score, filters, medit, activity, steps, heartrate, sleep, weight, stress
    }
}

export default connect(mapStateToProps, {
  dataFetch, 
  dataSave, 
  dataAdd,
  walletFetch,
  fetchFeedFilters,
  fetchFeedStories,
  addFeedStory,
  removeFeedStory,
  removeAllFeedStories,
  humanAPIFetch,
  healthScoreSave,
  addHealthTimeSeries,
  timeseriesMeditFetch,
  timeseriesScoreFetch,
  addMeditTimeSeries,
  addHealthScoreTimeSeries,
  timeseriesActivityFetch,
  timeseriesStepsFetch,
  timeseriesHeartrateFetch,
  timeseriesSleepFetch,
  deviceInfoFetch
  })(HealthView);