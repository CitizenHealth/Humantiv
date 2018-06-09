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
  SettingsSwitch,
  SettingsSection,
  IconButton
 } from "./common";
 import { 
  primaryBackgroungColor,
  primaryBlueColor,
  graphGreyColor,
  ActivityFeedTypes
} from './themes';
import {connect} from "react-redux";
import { scale } from "react-native-size-matters";
import { Actions } from 'react-native-router-flux';
import { TextInput } from "./custom"
import {  
  filtersSave
} from "../actions";
import {Fonts} from '../resources/fonts/Fonts';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import firebase from "react-native-firebase";

class FeedFiltersView extends Component {

  componentWillMount () {
    firebase.analytics().setCurrentScreen('Feed Filters Screen', 'FeedFiltersView');
  }

  onFeedFilterChange(filter,value) {
    this.props.filtersSave({[filter]: !value});
  }

  renderFilters() {
    const {filters} = this.props;

    // Only call the save function every 300 ms so we don't save to the server every user action
    
    const filtersView = Object.keys(ActivityFeedTypes).map( (section,id) => {   
      return (
      < SettingsSection
        title={section}
        key={id}
      >
        {Object.keys(ActivityFeedTypes[section]).map((item, index) => {

          var filter = ActivityFeedTypes[section][item];
          var onFeedFilterChange = _.debounce((value) => this.onFeedFilterChange(filter, value), 300);

          var filter_default = (filters) ? filters[filter] : true;
          return (
            < SettingsSwitch
              key={index}
              label={item}
              onValueChange= {onFeedFilterChange}
              value = {(filter_default !== "" && filter_default !== undefined) ? !filter_default : true}
            />
          )         
        })}
      </SettingsSection>
      );
      
    })

    if (filtersView.length > 0) {
      return (
        <View>
          {filtersView}
        </View>
      )
    } else {
      return <View/>
    }
  }

  render() {
    const {
      headerStyle,
      textStyle
    } = styles;


   return (
          <View style={{
            flex: 1,
            backgroundColor: primaryBackgroungColor
          }}>
          <ScrollView
            style={{
              flex: 1
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
          >
          <View style={headerStyle}>
              <IconButton onPress={() => {Actions.pop()}}>
                <FontAwesome>{Icons.angleLeft}</FontAwesome>
              </IconButton> 
              <Text style={textStyle}> Feed Filters </Text> 
              <View style={{
                height: 60,
                width: 60
              }}/>                   
          </View>
          {this.renderFilters()}
        </ScrollView>
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
})(FeedFiltersView);