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
import {Avatar, IconButton} from './common';
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

         if (access_token === null) {
             return (
                 <View style={{flex: 1}}>

                 </View>
             );
         } else {
            return (
                <View style={{flex: 1}}>
                    <WebView
                    source={{uri: `https://chart.humanapi.co/v1/human/activities/summaries?chart_token=demo&start_date=2015-09-01&end_date=2015-09-30&type=gauge`}}
                        style={webStyle}
                    />
                    <WebView
                    source={{uri: `https://chart.humanapi.co/v1/human/activities/summaries?chart_token=demo&start_date=2015-09-01&end_date=2015-09-30&type=bar`}}
                        style={webStyle}
                    />
                    <WebView
                    source={{uri: `https://chart.humanapi.co/v1/human/activities/summaries?chart_token=demo&start_date=2015-09-01&end_date=2015-09-30&type=line`}}
                        style={webStyle}
                    />
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
                    <Text style={textStyle}> Citizen Health </Text>
                    <IconButton onPress={this.onSettingsPress.bind(this)}>
                        <FontAwesome>{Icons.sliders}</FontAwesome>
                    </IconButton>
                </View>
                {this.renderActivity()}
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={this.connectHumanAPI}>
                        <Text style={styles.instructions}>
                            CONNECT HEALTH SERVICES AND DEVICES
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    pageStyle: {
        flexDirection: "column",
        alignItems: "stretch",
        flex: 1
    },
    headerStyle: {
        backgroundColor: "#FFF",
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
        fontSize: 0,
        color: "#808080",
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