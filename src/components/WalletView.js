import React, {Component} from "react";
import { 
    Platform, 
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
import Modal from "react-native-modal";

import {
    Avatar, 
    IconButton,
    PriceGraphCard,
    Card,
    ValueCard,
    WalletCard,
    GraphCard,
    Icon,
    EarnMedits
} from './common';
import { 
    dataAdd,
    dataSave,
    dataFetch,
    walletFetch,
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
import LinearGradient from 'react-native-linear-gradient';
import DropdownAlert from 'react-native-dropdownalert';

class WalletView extends Component {

    constructor(props) {
      super(props);

      var dataArray = new Array();
      for (var i = 0; i<200; i++) {
//        dataArray[i] = 3000+(500*Math.round(Math.random()*100)/100-250)+ 3*i;
        dataArray[i] = 1;
      }

      this.state = {
        betaMeditHelpModal: false,
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
      const {children} = this.props;

    // Check if user data is not set
    if (!firebase.app().auth().currentUser.uid) {
      console.log('User not authenticated');
      return;
    }

    const shared = (children.share && children.share.app !== undefined) ? children.share.app + 1 : 0;
    this.props.dataSave({type: "share", data: {app: shared}});

    let referalLink = `https://humantiv.page.link/shared`
    // Create dynamic link
    const link = new firebase.links.DynamicLink(referalLink, 'humantiv.page.link')
      .android.setPackageName('io.citizenhealth.humantiv')
      .android.setFallbackUrl('https://humantiv.com')
      .ios.setBundleId('io.citizenhealth.humantiv')
      .ios.setAppStoreId('1347054342')
      .social.setTitle(this.props.share_title)
      .social.setDescriptionText(this.props.share_message)
      .social.setImageUrl('https://citizenhealth.io/wp-content/uploads/2018/07/Humantiv.jpg');

    if (Platform.OS === 'android') {
        firebase.links()
        .createShortDynamicLink(link, 'UNGUESSABLE')
  //      .createDynamicLink(link)
        .then((url) => {
          console.log(url);
          // Share the invitation link
          Share.share(
          {
            title: this.props.share_title,
            message: `${this.props.share_message} ${url}`,
            dialogTitle: "Share Humantiv"
          })
          .then(result =>  { 
            if (shared > 5) {
              // User shared more than the limit earning shares
              this.dropdown.alertWithType('info', 'Thank you!' , `You can only earn Medit on your 5 first shares`);
            } else {                
              this.props.dataAdd({type: "wallet", item: "medits", data: 10});
              // Add medit to feed
              const story = {
                title: "Sharing earned you",
                preposition: "",
                value: `10 Medits`,
                time: Math.round((new Date()).getTime() / 1000),
                type: "medits"
              }
              this.props.addFeedStory(story);
              console.log(result)
            }
          })
          .catch(errorMsg => {
            console.log(errorMsg)
          });
        })
        .catch(errorMsg => {
          console.log(errorMsg)
        });
      } else {
        firebase.links()
        .createShortDynamicLink(link, 'UNGUESSABLE')
        .then((url) => {
          console.log(url);
          // Share the invitation link
          Share.share(
          {
            title: this.props.share_title,
            message: `${this.props.share_message} ${url}`,
            dialogTitle: "Share Humantiv"
          })
          .then(result =>  {          
            if (shared > 5) {
              // User shared more than the limit earning shares
              this.dropdown.alertWithType('info', 'Thank you!' , `You can only earn Medit on your 5 first shares`);
            } else {                
              this.props.dataAdd({type: "wallet", item: "medits", data: 10});
              // Add medit to feed
              const story = {
                title: "Sharing earned you",
                preposition: "",
                value: `10 Medits`,
                time: Math.round((new Date()).getTime() / 1000),
                type: "medits"
              }
              this.props.addFeedStory(story);
              console.log(result)
            }
          })
          .catch(errorMsg => {
            console.log(errorMsg)
          });
        })
        .catch(errorMsg => {
          console.log(errorMsg)
        });
      }
    }

    betaMeditHelp() {
      this.setState({betaMeditHelpModal: true});
    }

    onClose() {
      this.setState({betaMeditHelpModal: false});
    }

    renderModalContent() {
      const {
        helpDialogTextStyle
      } = styles;

      return (
        <View 
        style= {{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: primaryWhiteColor,
          shadowColor: primaryGreyColor,
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View
          style= {{
            height: 30,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: primaryBlueColor,
            borderTopLeftRadius: 10,
            borderTopRightRadius:10
          }}
        >
          <TouchableOpacity 
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 30,
              width: 30
            }}
            onPress={() => this.onClose()}
            hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          >
            <FontAwesome
              style={{
                fontSize: 20,
                color: primaryWhiteColor
              }}
            >
              {Icons.timesCircle}
            </FontAwesome>
          </TouchableOpacity>
        </View>
        <View
          style= {{
            height: scale(40),
            alignContent: 'center',
            width: '100%',
            backgroundColor: primaryBlueColor
          }}
        >
          <Text
            style={{
              flex: 4,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '600',
              color: primaryWhiteColor,
            }}
          >
            What is my Beta Medit Balance?
          </Text>
        </View>

        <View
          style= {{
            margin: 10
          }}
        >
          <Text
            style={helpDialogTextStyle}
          >
            This is Medit you earned during the Humantiv app beta test period. It is held in a separate account. You can use your Medit when we introduce the upcoming marketplace. Until then, keep earning more Medit!
          </Text>
        </View>
      </View>
      )
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
          <View style={{height: valueCardWidth}}>
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
                    onPress={() => Linking.openURL('https://citizenhealth.io/for-investors/')}
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
            {/*   <PriceGraphCard 
                  data= {this.state.data}
                  style={{
                  type: "medit",
                  graphColor: "blue",
                  backgroundColor: "#fff"
                  }}
                /> */}
            </View>
            );
    }

    renderEarnMedits() {
      const {
        earnMeditsGradientContainerStyle,
        earnMeditsContainerStyle,
        earnMeditsTextStyle,
        cardStyle
    } = styles;

      return (
        <View style={{
            borderRadius: 3,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.8,
            shadowColor: "#3ba4f9",
            shadowRadius: 5,
            height: 50,
            marginBottom: 10
          
          }}
          >
          <LinearGradient 
            style={[earnMeditsGradientContainerStyle, {
              overflow: 'hidden',
            }]}
            start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}}
            colors={['rgba(59, 163, 249,1)','rgba(84, 210, 249,0.7)']}
//            colors={(Platform.OS === 'android') ? [graphGreyColor, primaryGreyColor] : ['rgba(59, 163, 249,1)','rgba(84, 210, 249,0.7)']}
          >
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
                Share and Earn 10 Medit
              </Text>
            </TouchableOpacity>
          </LinearGradient>
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

    renderBetaMedit() {
      const {betaStyle} = styles;
      const {children} = this.props;

      const betamedits = (children.wallet) ? (children.wallet.betamedits ? children.wallet.betamedits : 0) : 0;
      const screenWidth = Dimensions.get('window').width;
      const valueCardWidth = (screenWidth - 20);

      return (betamedits > 0) ? (
        <View style={betaStyle}>
          <ValueCard 
            color= "#63727c"
            icon= "betamedit"
            title= "Beta Medit Balance"
            value= {formatNumbers(betamedits.toString())}
            width= {valueCardWidth}
            helpIcon= {true}
            helpOnPress= {() => this.betaMeditHelp()}
          />
        </View>
      ) : (
        <View/>
      )
    }
    render() {
        const {
            pageStyle,
            headerStyle,
            textStyle
        } = styles;

        const {
          dropDownErrorMessageTextStyle,
          dropDownErrorTitleTextStyle
        } = theme;

        const {betaMeditHelpModal} = this.state;

        return (
          <View style={pageStyle}>                 
                <View style={headerStyle}>
                  <Text style={textStyle}> Wallet </Text>               
                </View>
                <View
                  style={{
                    flex: 1
                  }}
                >
                  {this.renderGraphCard()} 
                  {this.renderBetaMedit()}
                </View>                  
                {this.renderEarnMedits()}
                   {/*{this.renderRedeem()}*/}  
                <Modal
                  isVisible={betaMeditHelpModal}
                  backdropOpacity={0}
                  animationIn="fadeIn"
                  animationOut="fadeOut"
                  animationInTiming={500}
                  animationOutTiming={500}
                  backdropTransitionInTiming={500}
                  backdropTransitionOutTiming={500}
                  style= {{
                    paddingTop: scale(70),
                    paddingBottom: scale(70)
                  }}
                > 
                  {this.renderModalContent()}
                </Modal> 
                <DropdownAlert 
                  ref={ref => this.dropdown = ref} 
                  closeInterval={6000} 
                  titleStyle = {dropDownErrorTitleTextStyle}
                  messageStyle = {dropDownErrorMessageTextStyle}
                />                
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
    cardStyle: {
      borderRadius: 3
    }, 
    betaStyle: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 3
    }, 
    textStyle: {
        flex: 4,
        textAlign: 'center',
        fontSize: 20,
        color: graphGreyColor,
        fontFamily: Fonts.regular
    },
    helpDialogTextStyle: {
      textAlign: 'justify',
      fontSize: 14,
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
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
    },
    earnMeditsGradientContainerStyle: {
      flex: 1,
      borderRadius: 5,
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      height: 45,
      elevation: 1
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
      color: graphGreyColor,
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
export default connect(mapStateToProps, {dataAdd, dataFetch, dataSave, walletFetch, addFeedStory})(WalletView);