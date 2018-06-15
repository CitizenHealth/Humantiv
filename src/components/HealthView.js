import React, {Component} from "react";
import { 
    WebView, 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Platform,
    ScrollView,
    Dimensions       
} from 'react-native';
import { scale } from "react-native-size-matters";
import {connect} from "react-redux";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HGraph from 'react-native-hgraph';
import {
    Feed,
    Avatar, 
    IconButton,
    ScoreCard,
    Card,
    ValueCard,
    GraphCard,
    Icon as HMIcon
} from './common';
import { Actions } from "react-native-router-flux";
import RNHumanAPI from 'react-native-human-api';
import { 
    dataSave,
    dataFetch,
    fetchFeedFilters,
    fetchFeedStories,
    addFeedStory,
    removeFeedStory,
    humanAPIFetch,
    fetchHealthTimeSeries,
    addHealthTimeSeries
  } from "../actions";
import {Fonts} from '../resources/fonts/Fonts';
import firebase from "react-native-firebase";
import { 
  theme, 
  primaryBlueColor, 
  primaryBackgroungColor,
  graphGreyColor,
  primaryWhiteColor,
  hGraphColor
 } from './themes';
import {formatNumbers} from '../business/Helpers';
import ActionButton from 'react-native-action-button';
import myStories from '../configuration/notifications.json'
import {graphGreenColor} from './themes/theme';
import {
  needToSaveHealthScore,
  getHealthScore
} from '../business/sources/CalculateHealthScore';

const baseURL = 'https://connect.humanapi.co/embed?';
const clientID = 'b2fd0a46e2c6244414ef4133df6672edaec378a1'; //Add your clientId here
const clientSecret = '1de96f660418ba961d6f2de259f01aaed5da3445';
const appKey = 'a6c69376d010aed5da148c95e771d27e7459e23d';
const finishURL = 'https://connect.humanapi.co/blank/hc-finish';
const closeURL = 'https://connect.humanapi.co/blank/hc-close';

class HealthView extends Component {

    componentWillMount () {       
      firebase.analytics().setCurrentScreen('My Health Screen', 'MyHealthView');
      this.setState({
          healthScore: ""
      });
    }

    componentDidMount() {
      this.refreshDataSources();
      this.props.dataFetch({type: "health"});
      this.props.dataFetch({type: "wallet"});
      this.props.dataFetch({type: "profile"});
      this.props.fetchHealthTimeSeries({type: "score"});
      this.props.fetchFeedFilters();
      this.props.fetchFeedStories();
      this.props.dataFetch({type: "notifications"});     
    }

    saveHumanAPIPublicToken(token) {
        const {children} = this.props;
    
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
             },  // callback when success with auth_url
            cancel: () => console.log('cancel')  // callback when cancel
        }
        humanAPI.onConnect(options)
    }

    refreshDataSources = () => {
      this.props.dataFetch({type: "humanapi"});
    }

    onSettingsPress() {
      Actions.profile();
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
          children, 
          activity,
          steps,
          sleep,
          heartrate,
          weight,
          stress
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

        
        const healthData = getHealthScore(
          activity,
          sleep,
          weight,
          heartrate,
          steps
        );

        let scores = []
        if (children.health && children.health.score) {
          scores = children.health.score;
        }

        // converrt the list of objects into an array
        var arrayObj = Object.keys(scores).map((key) => {
          return {time: Number(key), value: scores[key]};
        });

        if (needToSaveHealthScore(arrayObj)) {
          this.props.addHealthTimeSeries("score", {time: Math.round((new Date()).getTime() / 1000), value: healthData.healthScore});
        } else {
          if (arrayObj.length>0) {
            this.props.addHealthTimeSeries("score", {time: arrayObj[arrayObj.length - 1].time, value: healthData.healthScore});
          }
        }

        const activities = (activity) ? activity : [];
        const stepss = (steps) ? steps : [];
        const sleeps = (sleep) ? sleep : [];
        const heartrates = (heartrate) ? heartrate : [];
        const weights = (weight) ? weight : [];
        const stresses = (stress) ? stress : [];
        const scoress = arrayObj;

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
                        <HMIcon 
                          name="sandwich"
                          size= {16}
                        />
                    </IconButton>
                </View>
                <View style={
                    [cardsContainer,
                    {height: 3*graphCardWidth+20}]}>
                    <View style={cardsStyle}>
                        <GraphCard
                            title= "Health Score"
                            unit= ""
                            data= {scoress}
                            rules= {{ 
                                min: 0,
                                max: 100,
                                healthyMin: 75,
                                healthyMax: 100
                            }}
                            width= {graphScoreCardWidth}
                            height= {graphCardWidth}
                        />
                    </View>
                      <View style={cardsStyle}>
                        <GraphCard
                            title= "Steps"
                            unit= "steps"
                            data= {stepss}
                            rules= {{ 
                                min: 0,
                                max: 1000000,
                                healthyMin: 10000,
                                healthyMax: 1000000
                            }}
                            width= {graphCardWidth}
                            height= {graphCardWidth}
                        />
                        <GraphCard
                            title= "Activity"
                            unit= "minutes"
                            data= {activity}
                            rules= {{ 
                                min: 0,
                                max: 1440,
                                healthyMin: 45,
                                healthyMax: 1440
                            }}
                            width= {graphCardWidth}
                            height= {graphCardWidth}
                        />
                    </View>
                    <View style={cardsStyle}>
                        <GraphCard
                            title= "Sleep"
                            unit= "hours"
                            data= {sleeps}
                            rules= {{ 
                                min: 0,
                                max: 24,
                                healthyMin: 7,
                                healthyMax: 12
                            }}
                            width= {graphCardWidth}
                            height= {graphCardWidth}
                        />
                        <GraphCard
                            title= "Heart Rate"
                            unit= "bpm"
                            data= {heartrates}
                            rules= {{ 
                                min: 20,
                                max: 200,
                                healthyMin: 50,
                                healthyMax: 120
                            }}
                            width= {graphCardWidth}
                            height= {graphCardWidth}
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
        const {children} = this.props;
        const {cardsStyle} = styles;
        const {
          activity,
          sleep,
          heartrate,
          weight,
          steps,
          stress
          } = this.props;

        const public_token = (children.humanapi && children.humanapi.public_token) ? children.humanapi.public_token : null;
        const human_id = (children.humanapi && children.humanapi.human_id) ? children.humanapi.human_id : null;
        const access_token = (children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null;
 
        const healthData = getHealthScore(
          activity,
          sleep,
          weight,
          heartrate,
          steps
        );

        // Get humanId and accessToken from the humanapi table
         console.log(`WEBVIEW public_token: ${public_token}`);
         console.log(`WEBVIEW human_id: ${human_id}`);
         console.log(`WEBVIEW access_token: ${access_token}`);


            const medits = (children.wallet) ? children.wallet.medits : "";
            const mdx = (children.wallet) ? children.wallet.mdx : "";
            const screenWidth = Dimensions.get('window').width;
            const valueCardWidth = (screenWidth - 30)/2;
            const hgraphWidth = screenWidth - 120;
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

                        <ValueCard
                            color= "#34d392"
                            icon= "medex"
                            title= "MDX Balance"
                            value= {formatNumbers(mdx.toString())}
                            width= {valueCardWidth}
                        />

                    </View>
                    <ScoreCard 
                        style={{
                        title: "Health Graph",
                        buttonTitle: "Add data source",
                        footerTitle: "Sync with devices",
                        backgroundColor: "#fff",
                        }}
                        onPressHeader= {this.connectHumanAPI}
                        onPressFooter= {this.refreshDataSources}
                    >
                        <HGraph
                            scoreFontColor= {(((children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null) === null) ? "#b7daff" : '#3ED295'}
                            scoreFontSize={(((children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null) === null) ? 16 : 50}
                            width= {hgraphWidth}
                            height= {hgraphWidth}
                            pathColor= "#b7daff"
                            score={(((children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null) === null) ? "Add your first data source" : (healthData.healthScore === -1) ? "" : healthData.healthScore} 
                            healthyRangeFillColor={(((children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null) === null) ?  primaryWhiteColor : hGraphColor}
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
                            data= {healthData.healthData}
                        />
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

        return (
            <View style={pageStyle}>
                <ScrollView > 
                    <View style={headerStyle}>
                        {this.renderProfileImage()}
                        <Text style={textStyle}> My health </Text>
                        <IconButton
                            onPress={this.onSettingsPress.bind(this)}
                            viewStyles={iconStyle}
                            textStyles={[iconTextStyle, {color:graphGreyColor}]}
                        >
                            <HMIcon 
                              name="bell"
                              size= {20}
                            />
                        </IconButton>                 
                    </View>                  
                    {this.renderActivity()}
                    {this.renderGraphTiles()}
                    {this.renderActivityFeed()}                  
                </ScrollView > 
                <ActionButton 
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
                </ActionButton>       
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
        padding: 10,
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
    const {activity, steps, heartrate, sleep, weight, stress} = state.timeseries

    return {
        user, children, stories, filters, activity, steps, heartrate, sleep, weight, stress
    }
}
export default connect(mapStateToProps, {
  dataFetch, 
  dataSave, 
  fetchFeedFilters,
  fetchFeedStories,
  addFeedStory,
  removeFeedStory,
  humanAPIFetch,
  fetchHealthTimeSeries,
  addHealthTimeSeries
  })(HealthView);