import React, { Component } from 'react'
import {dataFetch, dataSave} from '../actions/DataAction';
import journeyData from '../configuration/journey.json';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView
} from 'react-native';
import {
  JourneyChoice,
  Icon,
  Button
} from './common'
import {
  primaryGreenColor,
  primaryBackgroungColor,
  highlightedGreyColor,
  theme
} from '../components/themes';
import { Fonts } from '../resources/fonts/Fonts'
import { scale } from "react-native-size-matters";
import { Actions } from "react-native-router-flux";

class SettingsJourneyView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ready: false
    }
  }
  componentWillMount() {
    this.props.dataFetch({type: 'profile'});
  }

  setSeletedJourney(key) {
    const {children} = this.props;
    if (key !== "" ) {
      this.setState({ready: true});
    }
    this.props.dataSave({type: "profile", data: {journey: key}});
  }

  render() {
    const {
      scrollViewStyle,
      headerContainerStyle,
      iconContainerStyle,
      textContainerStyle,
      titleStyle,
      subTitleStyle,
      buttonContainerStyle
    } = styles;

    const {children} = this.props;

    const profile_journey = (children.profile) ? children.profile.journey : "";

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={scrollViewStyle}>
          <View style={headerContainerStyle}>
          <View style={iconContainerStyle}>
              <Icon 
                  name='hands_heart'
                  color= {primaryGreenColor}
                  size= {70}
              />
          </View>
          <View style={textContainerStyle}>
            <Text style={titleStyle}>
            Health Journey
            </Text>
            <Text style={subTitleStyle}>
            What health journey do you wish to go on?
            </Text>
          </View>
          </View>
          <JourneyChoice
            data= {journeyData}
            style={{
              flex:1,
              backgroundColor: primaryBackgroungColor
            }}
            setSelected={(key)=>{this.setSeletedJourney(key)}}
            value={profile_journey}
          />
          <View style={buttonContainerStyle}>
            <Button
              onPress={() => {Actions.pop()}}
              style={{
                marginLeft: scale(60),
                marginRight: scale(60)
              }}
            >
              <Text style={theme.primaryWhiteTextStyle}> Accept </Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

}

const styles = {
  scrollViewStyle:{
    backgroundColor: primaryBackgroungColor,
  },
  headerContainerStyle: {
    height: scale(160),
    backgroundColor: primaryBackgroungColor,
  },
  iconContainerStyle: {
    marginTop: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  textContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: 25,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: primaryGreenColor,
  },
  subTitleStyle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: highlightedGreyColor
  },
  buttonContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignContent: 'center'
  }
}

const mapStateToProps = state => {
  const {children} = state.data;

  return {children};
}

export default connect(mapStateToProps, {dataFetch, dataSave})(SettingsJourneyView);