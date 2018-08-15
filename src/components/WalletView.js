import React, {Component} from "react";
import { 
    WebView, 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Linking,
    ScrollView,
    Dimensions,
    Share       
} from 'react-native';
import { scale } from "react-native-size-matters";
import {connect} from "react-redux";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import HGraph, { hGraphConvert, calculateHealthScore }  from 'react-native-hgraph';
import {
    Avatar, 
    IconButton,
    PriceGraphCard,
    Card,
    WalletCard,
    GraphCard,
    Icon,
    EarnMedits
} from './common';
import Feed from "./common/Feed";
import { Actions } from "react-native-router-flux";
import { 
    dataAdd,
    dataSave,
    dataFetch,
    walletFetch,
    humanAPIFetch,
    addFeedStory
  } from "../actions";
import {Fonts} from '../resources/fonts/Fonts';
import firebase from "react-native-firebase";
import { 
  theme,
  graphGreyColor,
  primaryBlueColor,
  primaryBackgroungColor
 } from './themes';
import {formatNumbers} from '../business/Helpers';
import {primaryWhiteColor, primaryGreyColor} from './themes/theme';

class WalletView extends Component {

    constructor(props) {
      super(props);

      var dataArray = new Array();
      for (var i = 0; i<200; i++) {
//        dataArray[i] = 3000+(500*Math.round(Math.random()*100)/100-250)+ 3*i;
        dataArray[i] = 1;
      }

      this.state = {
        data: [1]
      }
    }
    componentWillMount () {
        this.props.walletFetch({type: "wallet"});
        firebase.analytics().setCurrentScreen('My Wallet Screen', 'WalletView');
        this.refreshData();
    }

    refreshData() {
      var dataArray = new Array();
      for (var i = 0; i<200; i++) {
         dataArray[i] = 1;
      }
      this.setState({data: dataArray});
    }

    redeemMedits = () => {
        this.refreshData();
    }

    share = () => {
      Share.share(
        {
          title: this.props.share_title,
          message: this.props.share_message,
          dialogTitle: "Share Humantiv"
        }).then(result =>  {
            const {children} = this.props;
            const medits = (children.wallet) ? children.wallet.medits : "";
            
            let newMedits = medits+10;
            this.props.dataAdd({type: "wallet", item: "medits", data: newMedits});
            // Add medit to feed
            const story = {
              title: "Your sharing earned you",
              preposition: "",
              value: `10 Medits`,
              time: Math.round((new Date()).getTime() / 1000),
              type: "medits"
            }
            this.props.addFeedStory(story);
            console.log(result)
        }).catch(errorMsg => {
          console.log(errorMsg)
        });
    }
    
    renderGraphCard() {
        const {children} = this.props;
        const {
          cardsStyle
        } = styles;

      const medits = (children.wallet) ? (children.wallet.medits ? children.wallet.medits : 0) : 0;
      const mdx = (children.wallet) ? (children.wallet.mdx ? children.wallet.mdx : 0) : 0;
      const screenWidth = Dimensions.get('window').width;
      const valueCardWidth = (screenWidth - 30)/2;
      const hgraphWidth = screenWidth - 120;
      return (
          <View style={{flex: 1}}>
              <View style={cardsStyle}>
                  <WalletCard 
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
                    <WalletCard
                        color= "#34d392"
                        icon= "medex"
                        title= "MDX Balance"
                        value= "Invest"
                        width= {valueCardWidth}
                    />
                  </TouchableOpacity>
              </View>
              {this.renderEarnMedits()}
              <PriceGraphCard 
                  data= {this.state.data}
                  style={{
                  type: "medit",
                  graphColor: "blue",
                  }}
              />
            </View>
            );
    }
    renderEarnMedits() {
      const {
        earnMeditsContainerStyle,
        earnMeditsTextStyle
    } = styles;

      return (
        <View style={{flex: 1}}>
          <TouchableOpacity 
            style={earnMeditsContainerStyle} 
            onPress={() => this.share()}
          >
             <FontAwesome
              style={{fontSize: 24, color: primaryWhiteColor}}
            > 
              {Icons.shareAlt}
            </FontAwesome>
            <Text style={earnMeditsTextStyle}>
              Share and Earn Free Medits
            </Text>
          </TouchableOpacity>
        </View>
      )
    }

    renderRedeem() {
      const {
          cardFooterButtonTitleStyle,
          footerContainerStyle,
          cardTitleContainerStyle
      } = styles;

      const {
        iconTextStyle
      } = theme;  

      return (
        <View style={footerContainerStyle}>
            <View style={cardTitleContainerStyle}>
            <IconButton
                  onPress={() => {this.redeemMedits();}}
                  viewStyles={{disabled: true}}
                  textStyles={[iconTextStyle, {color:primaryBlueColor}]}
                  disabled
                >
                <FontAwesome
                  style={{color: primaryGreyColor}}
                > 
                  {Icons.shoppingCart}
                </FontAwesome>
              </IconButton>
              <Text style={cardFooterButtonTitleStyle}>
                Redeem Medits
              </Text>
            </View>
        </View>
      )
    }

    render() {
        const {
            pageStyle,
            headerStyle,
            textStyle
        } = styles;

        return (
          <View style={pageStyle}>
              <ScrollView >                   
                <View style={headerStyle}>
                  <Text style={textStyle}> Wallet </Text>               
                </View>
                   {this.renderGraphCard()} 
                  {this.renderRedeem()}                
              </ScrollView >     
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
        alignContent: 'stretch'
    },
    textStyle: {
        flex: 4,
        textAlign: 'center',
        fontSize: 20,
        color: graphGreyColor,
        fontFamily: Fonts.regular
    },
    cardsStyle: {
        flex: 1,
        justifyContent: "space-between",
        alignContent: "center",
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10
    },
    earnMeditsContainerStyle: {
      flex: 1,
      borderRadius: 5,
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      height: 45,
      elevation: 1,
      backgroundColor: primaryBlueColor
    },
    earnMeditsTextStyle: {
      fontSize: 18,
      fontWeight: "400",
      color: primaryWhiteColor,
      fontFamily: Fonts.regular
    },
    cardTitleContainerStyle: {
      justifyContent: "center",
      alignItems: 'center',
      flexDirection: "row",
      paddingLeft: 15
    },  
    cardFooterButtonTitleStyle: {
      fontSize: 14,
      fontWeight: "400",
      color: primaryBlueColor,
      fontFamily: Fonts.regular
    },
    footerContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
    }
});

const mapStateToProps = (state) => {
    const {user} = state.auth;
    const {children} = state.data;
    const {share_title, share_message} = state.config.configuration;

    return {
        user, children, share_title, share_message
    }
}
export default connect(mapStateToProps, {dataAdd, dataFetch, dataSave, walletFetch, humanAPIFetch, addFeedStory})(WalletView);