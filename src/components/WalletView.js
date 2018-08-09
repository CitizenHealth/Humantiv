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
    PriceGraphCard,
    Card,
    WalletCard,
    GraphCard,
    Icon
} from './common';
import Feed from "./common/Feed";
import { Actions } from "react-native-router-flux";
import { 
    dataSave,
    dataFetch,
    walletFetch,
    humanAPIFetch
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

    renderGraphCard() {
        const {children} = this.props;
        const {
          cardsStyle
        } = styles;

      const medits = (children.wallet) ? children.wallet.medits : "";
      const mdx = (children.wallet) ? children.wallet.mdx : "";
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

                  <WalletCard
                      color= "#34d392"
                      icon= "medex"
                      title= "MDX Balance"
                      value= {formatNumbers(mdx.toString())}
                      width= {valueCardWidth}
                  />

              </View>
              <PriceGraphCard 
                  data= {this.state.data}
                  style={{
                  type: "medit",
                  graphColor: "blue"
                  }}
              />
            </View>
            );
    }

    renderRedeem() {
      const {
          cardFooterButtonTitleStyle,
          footerContainerStyle,
          cardTitleContainerStyle
      } = styles;

      const {
        iconStyle,
        iconTextStyle
      } = theme;  

      return (
        <View style={footerContainerStyle}>
            <View style={cardTitleContainerStyle}>
            <IconButton
                  onPress={() => {this.redeemMedits();}}
                  viewStyles={iconStyle}
                  textStyles={[iconTextStyle, {color:primaryBlueColor}]}
                >
                <Icon name="plus_blue"/>
              </IconButton>
              <Text style={cardFooterButtonTitleStyle}>
                Redeem Medit
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

    return {
        user, children
    }
}
export default connect(mapStateToProps, {dataFetch, dataSave, walletFetch, humanAPIFetch})(WalletView);