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
    Avatar, 
    IconButton,
    ScoreCard,
    Card,
    ValueCard,
    Icon
} from './common';
import { Actions } from "react-native-router-flux";
import RNHumanAPI from 'react-native-human-api';
import { 
    dataSave,
    dataFetch,
    humanAPIFetch
  } from "../actions";
import {Fonts} from '../resources/fonts/Fonts';
import firebase from "react-native-firebase";
import { theme, primaryBlueColor } from './themes';

const baseURL = 'https://connect.humanapi.co/embed?';
const clientID = 'b2fd0a46e2c6244414ef4133df6672edaec378a1'; //Add your clientId here
const clientSecret = '1de96f660418ba961d6f2de259f01aaed5da3445';
const appKey = 'a6c69376d010aed5da148c95e771d27e7459e23d';
const finishURL = 'https://connect.humanapi.co/blank/hc-finish';
const closeURL = 'https://connect.humanapi.co/blank/hc-close';

class HumanAPI extends Component {

    componentWillMount () {
        this.props.dataFetch({type: "humanapi"});
        this.props.dataFetch({type: "health"});
        this.props.dataFetch({type: "wallet"});
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

        const public_token = (children.humanapi && children.humanapi.public_token) ? children.humanapi.public_token : null;
        const human_id = (children.humanapi && children.humanapi.human_id) ? children.humanapi.human_id : null;
        const access_token = (children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null;
 
        // Get humanId and accessToken from the humanapi table
         console.log(`WEBVIEW public_token: ${public_token}`);
         console.log(`WEBVIEW human_id: ${human_id}`);
         console.log(`WEBVIEW access_token: ${access_token}`);

      
         if (access_token === null) {
            this.setState({healthData: [], healthScore: null});
         } else {
            this.setState({healthData: healthData, healthScore: healthScore});
        }
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
            sectionContainerStyle
        } = styles;

        const {
            iconStyle,
            iconTextStyle
          } = theme;

        return (
            <View>
                <View style={sectionContainerStyle}>
                    <Text style={sectionTitleStyle}>
                        My stats
                    </Text>
                    <IconButton
                        onPress={this.props.onPressFooter}
                        viewStyles={iconStyle}
                        textStyles={[iconTextStyle, {color:"#757b86"}]}
                    >
                    <Icon name="sandwich"/>
              </IconButton>
                </View>
                <View>
                </View>
            </View>
        )
    }

    renderActivityFeed() {

    }

    renderActivity() {
        const {webStyle, valueCardsStyle} = styles;
        const {children} = this.props;

            const medits = (children.wallet) ? children.wallet.medits : "";
            const mdx = (children.wallet) ? children.wallet.mdx : "";
            const screenWidth = Dimensions.get('window').width;
            const valueCardWidth = (screenWidth - 30)/2;
            const hgraphWidth = screenWidth - 220;
            return (
                <View style={{flex: 1}}>
                    <View style={valueCardsStyle}>
                        <ValueCard
                            color= "#3ba4f9"
                            icon= "center"
                            title= "Medit Balance"
                            value= {medits}
                            width= {valueCardWidth}
                        />

                        <ValueCard
                            color= "#34d392"
                            icon= "center"
                            title= "MDX Balance"
                            value= {mdx}
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
                            score={this.state.healthScore} 
                            margin={
                            {top: 50,
                            right: 100, 
                            bottom: 50, 
                            left: 100}}
                            showAxisLabel={true}
                            fontSize={12}
                            fontColor="#b6bbc4"
                            scoreFontSize={50}
                            data= {this.state.healthData}
                        />
                    </ScoreCard>
                 </View>
            );
    }
    render() {
        const {
            button,
            instructions,
            pageStyle,
            headerStyle,
            textStyle
        } = styles;

        return (
            <View style={pageStyle}>
                <View style={headerStyle}>
                    {this.renderProfileImage()}
                    <Text style={textStyle}> My Health </Text>
                    <IconButton onPress={this.onSettingsPress.bind(this)}>
                        <FontAwesome>{Icons.sliders}</FontAwesome>
                    </IconButton>
                </View>
                <ScrollView >                   
                    {this.renderActivity()}
                    {this.renderGraphTiles()}
                    {this.renderActivityFeed()}                  
                </ScrollView >        
            </View>
            );
    }
}

const styles = StyleSheet.create({
    pageStyle: {
        backgroundColor: "#f9fafc",
        flexDirection: "column",
        alignItems: "stretch",
        flex: 1
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: scale(60),
        alignItems: 'center',
        alignContent: 'stretch'
    },
    webStyle: {
        flex: 1,
        alignContent: 'stretch'
    },
    valueCardsStyle: {
        flex: 1,
        justifyContent: "space-between",
        alignContent: "center",
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10, 
        height: 100
    },
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: scale(80),
    },
    instructions: {
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
        ...Platform.select({
            ios: { fontFamily: "Arial", },
            android: { fontFamily: "Roboto" }
        })
    },
    textStyle: {
        flex: 4,
        textAlign: 'center',
        fontSize: 20,
        color: "#757b86",
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
        height: 60,
        padding: 10,
    },
    sectionTitleStyle: {
        fontSize: 18,
        fontWeight: "400",
        color: "#757b86",
        paddingLeft: 10,
        fontFamily: Fonts.regular
    }
});

const mapStateToProps = (state) => {
    const {user} = state.auth;
    const {children} = state.data;

    return {
        user, children
    }
}
export default connect(mapStateToProps, {dataFetch, dataSave, humanAPIFetch})(HumanAPI);