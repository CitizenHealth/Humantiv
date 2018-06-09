import React, { Component } from 'react';
import _ from 'lodash';
import { 
  ScrollView, 
  View, 
  Text, 
  Platform, 
  StyleSheet 
} from 'react-native';
 import { 
  primaryBackgroungColor,
  primaryBlueColor,
  graphGreyColor,
  Units
} from './themes';
import {connect} from "react-redux";
import { scale } from "react-native-size-matters";
import { Actions } from 'react-native-router-flux';
import {  
  filtersSave
} from "../actions";
import {Fonts} from '../resources/fonts/Fonts';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import firebase from "react-native-firebase";

class ManualLogView extends Component {

  constructor(props) {
    super(props);

    const saveWeight = saveWeight.bind(this);

    this.state = {
      date: "",
      time: "",
      weight: props.value,
      unit: props.children.profile.height_units
    }
  }

  componentWillMount () {
    firebase.analytics().setCurrentScreen('Manual Log Screen', 'ManualLogView');
  }

  saveWeight() {

  }

  onFeedFilterChange(filter,value) {
    this.props.filtersSave({[filter]: value});
  }

  renderView() {
    switch (this.props.type) {
      case weight: 
        return(
          <View/>
        );
      case sleep:
      return(
        <View/>
      );
    }
  }

  render() {
    const {
      headerStyle,
      textStyle,
      cancelTextStyle,
      saveTextStyle
    } = styles;


   return (
        <View style={{
          flex: 1,
          backgroundColor: primaryBackgroungColor
        }}>
          <View style={headerStyle}>
              <IconButton onPress={() => {Actions.pop()}}>
                <Text
                  style={{cancelTextStyle}}
                >
                X
                </Text>
              </IconButton> 
              <Text style={textStyle}> Add Your Weight </Text> 
              <IconButton onPress={() => {()=> {saveWeight}}}>
                <Text
                  style={{saveTextStyle}}
                >
                Save
                </Text>
              </IconButton>                
          </View>
          {this.renderView()}
      </View>
    );
  }
}

const styles ={
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
  }
}

const mapStateToProps = state => {
  const {filters} = state.feed;
  return {filters}; 
};

export default connect(mapStateToProps, {
  filtersSave
})(ManualLogView);