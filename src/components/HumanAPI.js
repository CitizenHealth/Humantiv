import React, {Component} from "react";
import { 
    WebView, 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Platform 
} from 'react-native';
import { scale } from "react-native-size-matters";
import {connect} from "react-redux";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HGraph, { hGraphConvert, calculateHealthScore }  from 'react-native-hgraph';
import {
    Avatar, 
    IconButton,
    ScoreCard,
    Card
} from './common';
import { Actions } from "react-native-router-flux";
import RNHumanAPI from 'react-native-human-api';
import { 
    dataSave,
    dataFetch,
    humanAPIFetch
  } from "../actions";

const baseURL = 'https://connect.humanapi.co/embed?';
const clientID = 'b2fd0a46e2c6244414ef4133df6672edaec378a1'; //Add your clientId here
const clientSecret = '1de96f660418ba961d6f2de259f01aaed5da3445';
const appKey = 'a6c69376d010aed5da148c95e771d27e7459e23d';
const finishURL = 'https://connect.humanapi.co/blank/hc-finish';
const closeURL = 'https://connect.humanapi.co/blank/hc-close';

class HumanAPI extends Component {

    componentWillMount () {
        this.props.dataFetch({type: "humanapi"});
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

    renderActivity() {
        const {webStyle} = styles;
        const {children} = this.props;

        const public_token = (children.humanapi && children.humanapi.public_token) ? children.humanapi.public_token : null;
        const human_id = (children.humanapi && children.humanapi.human_id) ? children.humanapi.human_id : null;
        const access_token = (children.humanapi && children.humanapi.access_token) ? children.humanapi.access_token : null;
 
        // Get humanId and accessToken from the humanapi table
         console.log(`WEBVIEW public_token: ${public_token}`);
         console.log(`WEBVIEW human_id: ${human_id}`);
         console.log(`WEBVIEW access_token: ${access_token}`);

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
         if (access_token === null) {
             return (
                 <View style={{flex: 1}}>

                 </View>
             );
         } else {
            return (
                <View style={{flex: 1}}>
                    <View style={{
                        justifyContent: "space-between",
                        alignContent: "center",
                        flexDirection: "row", 
                        backgroundColor: "red",
                        height: 100
                    }}>
                        <Card style={{
                            backgroundColor: "blue",
                            alignContent: "center",
                            width: 400,
                            height: 80
                            }}>
                            <Text>
                                10,030 MEDITS
                            </Text>
                        </Card>
                        <Card style={{
                            backgroundColor: "green",
                            alignContent: "center",
                            width: 400,
                            height: 80                            
                            }}>
                            <Text>
                                10,030 MEDITS
                            </Text>
                        </Card>
                    </View>
                    <ScoreCard 
                        style={{
                        title: "Health Graph",
                        buttonTitle: "Add data source",
                        backgroundColor: "#fff",
                        }}
                        onPress= {this.connectHumanAPI}
                    >
                        <HGraph
                            width= {200}
                            height= {200}
                            pathColor= "#dbecff"
    //                        score={this.props.score}
                            score={healthScore} 
                            margin={
                            {top: 50,
                            right: 100, 
                            bottom: 50, 
                            left: 100}}
                            showAxisLabel={true}
                            fontSize={12}
                            fontColor="#b6bbc4"
                            scoreFontSize={50}
                            data= {healthData}
                        />
                    </ScoreCard>
                </View>
            );
        }
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
                {this.renderActivity()}
                {/* <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={this.connectHumanAPI}>
                        <Text style={styles.instructions}>
                            CONNECT HEALTH SERVICES AND DEVICES
                        </Text>
                    </TouchableOpacity>
                </View> */}
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
        ...Platform.select({
          ios: { fontFamily: "Arial", },
          android: { fontFamily: "Roboto" }
        })
    },
    button: {
        flexDirection: 'row',
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#337ab7',
        marginBottom: 20
    },
});

const mapStateToProps = (state) => {
    const {user} = state.auth;
    const {children} = state.data;

    return {
        user, children
    }
}
export default connect(mapStateToProps, {dataFetch, dataSave, humanAPIFetch})(HumanAPI);