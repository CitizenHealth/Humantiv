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
import HGraph, { hGraphConvert, calculateHealthScore }  from 'react-native-hgraph';
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
    humanAPIFetch
  } from "../actions";
import {Fonts} from '../resources/fonts/Fonts';
import firebase from "react-native-firebase";
import { 
  theme, 
  primaryBlueColor, 
  primaryBackgroungColor,
  graphGreyColor
 } from './themes';
import {formatNumbers} from '../business/Helpers';
import ActionButton from 'react-native-action-button';
import myStories from '../configuration/notifications.json'

const baseURL = 'https://connect.humanapi.co/embed?';
const clientID = 'b2fd0a46e2c6244414ef4133df6672edaec378a1'; //Add your clientId here
const clientSecret = '1de96f660418ba961d6f2de259f01aaed5da3445';
const appKey = 'a6c69376d010aed5da148c95e771d27e7459e23d';
const finishURL = 'https://connect.humanapi.co/blank/hc-finish';
const closeURL = 'https://connect.humanapi.co/blank/hc-close';

class HealthView extends Component {

    componentWillMount () {
        this.props.dataFetch({type: "humanapi"});
        this.props.dataFetch({type: "health"});
        this.props.dataFetch({type: "wallet"});
        this.props.dataFetch({type: "profile"});
        this.props.fetchFeedFilters();
        this.props.fetchFeedStories();
        this.props.dataFetch({type: "notifications"});
        firebase.analytics().setCurrentScreen('My Health Screen', 'MyHealthView');
        this.setState({
            healthData: [],
            healthScore: 0
        });
        this.refreshData();
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

    refreshData() {
        const {children} = this.props;
        const totalCholesterolValue = (1-0)*Math.random();
        const ldlValue = (300-0)*Math.random();
        const hdlValue = (150-0)*Math.random();
        const triglyceridesValue = (300-0)*Math.random();
        const bloodPressureSystolicValue = (230-50)*Math.random();
        const bloodPressureDiastolicValue = (140-35)*Math.random();
        const alcoholUseValue = (20-0)*Math.random();
        const nicotineUseValue = (20-0)*Math.random();
        const painLevelValue = (10-0)*Math.random();
        const waistCircumferenceValue = (200-0)*Math.random();
        const weightValue = (400-50)*Math.random();
        const exerciseValue = (60-0)*Math.random();
        const sleepValue = (18-0)*Math.random();
        const happinessValue = (10-0)*Math.random();
        const glucoseValue = (160-0)*Math.random();
        const otherValue = (1-0)*Math.random();
        const healthData = [
          hGraphConvert('male', 'totalCholesterol',
          {
              id        : 'totalCholesterol',
              "value"     : totalCholesterolValue
          }),
          hGraphConvert('male', 'ldl',
          {
              id        : 'ldl',
              "value"     : ldlValue
          }),
          hGraphConvert('male', 'hdl',
          {
              id        : 'hdl',
              "value"     : hdlValue
          }),
          hGraphConvert('male', 'triglycerides',
          {
              id        : 'triglycerides',
              "value"     : triglyceridesValue
          }),
          hGraphConvert('male', 'bloodPressureSystolic',
          {
              id        : 'bloodPressureSystolic',
              "value"     : bloodPressureSystolicValue
          }),
          hGraphConvert('male', 'bloodPressureDiastolic',
          {
              id        : 'bloodPressureDiastolic',
              "value"     : bloodPressureDiastolicValue
          }),
          hGraphConvert('male', 'alcoholUse',
          {
              id        : 'alcoholUse',
              "value"     : alcoholUseValue
          }),
          hGraphConvert('male', 'nicotineUse',
          {
              id        : 'nicotineUse',
              "value"     : nicotineUseValue
          }),
          hGraphConvert('male', 'painLevel',
          {
              id        : 'painLevel',
              "value"     : painLevelValue
          }),
          hGraphConvert('male', 'waistCircumference',
          {
              id        : 'waistCircumference',
              "value"     : waistCircumferenceValue
          }),
          hGraphConvert('male', 'weight',
          {
              id        : 'weight',
              "value"     : weightValue
          }),
          hGraphConvert('male', 'exercise',
          {
              id        : 'exercise',
              "value"     : exerciseValue
          }),
          hGraphConvert('male', 'sleep',
          {
              id        : 'sleep',
              "value"     : sleepValue
          }),
          hGraphConvert('male', 'happiness',
          {
              id        : 'happiness',
              "value"     : happinessValue
          }),
          hGraphConvert('male', 'glucose',
          {
              id        : 'glucose',
              "value"     : glucoseValue
          }),
          hGraphConvert('male', 'other',
          {
              id        : 'other',
              "value"     : otherValue
          }),
        ]
  
        const healthScore =  Math.floor(calculateHealthScore(healthData));  

        this.setState({healthData: healthData, healthScore: healthScore});
    }

    addManualActivity = () => {
        this.refreshData();
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
                this.refreshData();
             },  // callback when success with auth_url
            cancel: () => console.log('cancel')  // callback when cancel
        }
        humanAPI.onConnect(options)
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

        return (
            <View>
                <View style={sectionContainerStyle}>
                    <Text style={sectionTitleStyle}>
                        My stats
                    </Text>
                    <IconButton
                        onPress={this.props.onPressFooter}
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
                    {height: 2*graphCardWidth+20}]}>
                    <View style={cardsStyle}>
                        <GraphCard
                            title= "Heart rate"
                            unit= "bpm"
                            data= {[
                                {time: 1, value: 78},
                                {time: 2, value: 45}, 
                                {time: 3, value: 121},  
                                {time: 4, value: 54}, 
                                {time: 5, value: 53}, 
                                {time: 6, value: 56}, 
                                {time: 7, value: 63},
                                {time: 8, value: 54}, 
                                {time: 9, value: 61},  
                                {time: 10, value: 59}, 
                                {time: 11, value: 58}, 
                                {time: 12, value: 59}, 
                            ]}
                            rules= {{ 
                                min: 40,
                                max: 280,
                                healthyMin: 55,
                                healthyMax: 100
                            }}
                            width= {graphCardWidth}
                            height= {graphCardWidth}
                        />

                        <GraphCard
                            title= "Glucose"
                            unit= "mg/dl"
                            data= {[
                                {time: 1, value: 112},
                                {time: 2, value: 97}, 
                                {time: 3, value: 96},  
                                {time: 4, value: 95}, 
                                {time: 5, value: 95},
                                {time: 6, value: 97},
                                {time: 7, value: 102}, 
                                {time: 8, value: 94},  
                                {time: 9, value: 98}, 
                                {time: 10, value: 97}
                             ]}
                            rules= {{ 
                                min: 0,
                                max: 160,
                                healthyMin: 61,
                                healthyMax: 100
                            }}
                            width= {graphCardWidth}
                            height= {graphCardWidth}
                        />
                    </View>
                    <View style={cardsStyle}>
                        <GraphCard
                            title= "Sleep"
                            unit= "hours"
                            data= {[
                                {time: 1, value: 6},
                                {time: 2, value: 7}, 
                                {time: 3, value: 5},  
                                {time: 4, value: 4}, 
                                {time: 5, value: 8}, 
                                {time: 6, value: 9}, 
                                {time: 7, value: 10},
                                {time: 8, value: 7}, 
                                {time: 9, value: 7},  
                                {time: 10, value: 8}, 
                                {time: 11, value: 7}, 
                                {time: 12, value: 9},                            ]}
                            rules= {{ 
                                min: 0,
                                max: 24,
                                healthyMin: 7,
                                healthyMax: 9
                            }}
                            width= {graphCardWidth}
                            height= {graphCardWidth}
                        />

                        <GraphCard
                            title= "Weight"
                            unit= "lbs"
                            data= {[
                                {time: 1, value: 367},
                                {time: 2, value: 350}, 
                                {time: 3, value: 257},  
                                {time: 4, value: 220}, 
                                {time: 5, value: 199}
                            ]}
                            rules= {{ 
                                min: 120,
                                max: 1000,
                                healthyMin: 120,
                                healthyMax: 190
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
                        onPress={this.props.onPressFooter}
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

        const public_token = (children.humanapi && children.humanapi.public_token) ? children.humanapi.public_token : null;
        const human_id = (children.humanapi && children.humanapi.human_id) ? children.humanapi.human_id : null;
        const access_token = (children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null;
 
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
                        footerTitle: "Add manual activity",
                        backgroundColor: "#fff",
                        }}
                        onPressHeader= {this.connectHumanAPI}
                        onPressFooter= {this.addManualActivity}
                    >
                        <HGraph
                            width= {hgraphWidth}
                            height= {hgraphWidth}
    //                        score={this.props.score}
                            pathColor= "#b7daff"
                            score={(((children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null) === null) ? null : this.state.healthScore} 
                            margin={
                            {top: 50,
                            right: 50, 
                            bottom: 50, 
                            left: 50}}
                            showAxisLabel={true}
                            fontSize={12}
                            fontColor="#b6bbc4"
                            scoreFontSize={50}
                            pointRadius = {3}
                            axisLabelOffset = {4}
                            axisLabelWrapWidth = {5}
                            donutHoleFactor = {.50}
                            pointLabelOffset = {4}
                            data= {(((children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null) === null) ? [] : this.state.healthData}
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

    return {
        user, children, stories, filters
    }
}
export default connect(mapStateToProps, {
  dataFetch, 
  dataSave, 
  fetchFeedFilters,
  fetchFeedStories,
  addFeedStory,
  removeFeedStory,
  humanAPIFetch
  })(HealthView);