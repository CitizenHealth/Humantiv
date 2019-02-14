import React, { Component } from "react";
import {convertUNIXTimeToString} from "../../business/Helpers";
import { 
  View,
  UIManager,
  LayoutAnimation
} from "react-native";
import { 
    theme, 
    primaryBlueColor, 
    graphGreenColor,
    graphOrangeColor,
    graphRedColor,
    graphGreyColor
} from '../themes';
import PropTypes from 'prop-types';
import {LeaderboardCard} from '../common';
import {ActivityFeedTypes, primaryBackgroungColor} from '../themes/theme';
import * as Animatable from 'react-native-animatable';

class LeaderboardList extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    start: PropTypes.number,
    users: PropTypes.arrayOf(
      PropTypes.shape(
        {
          name: PropTypes.string.isRequired,
          imageurl: PropTypes.string,
          points: PropTypes.number.isRequired,
          uniticon: PropTypes.string.isRequired,
          direction: PropTypes.string.isRequired,
          selected: PropTypes.bool
        }
      )
    )
  };

  static defaultProps = {
    width: 400,
    height: 50,
		start: 1
  }

  constructor(props) {
    super(props);

    this.state = {
      activeRowKey: null
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data != this.props.data )
      {
        return true;
      }
    return false
  }
  
  renderUsers() {
    const {
        width,
        height,
        users,
        start
    } = this.props;

    const {cardContainerStyle} = styles;

    const usersList = users.map( (user, index) => {   
      user.rank = index + 1; 
      if (index >= start - 1) 
        return ( 
        <Animatable.View 
          animation="fadeInUp"
          delay= {250*index}
          style = {cardContainerStyle}
          key={index}
        >
          <LeaderboardCard
            selected = {user.selected}
            user = {user}
          />
        </Animatable.View>         
        );
    });

    if (usersList.length > 0) {
      return (
        <View>
          {usersList}
        </View>
      )
    } else {
      return <View/>
    }
  }

  render() {
    const {
        containerStyle,
        cardContainerStyle
    } = styles;

    return (
        <View style={containerStyle}>
          {this.renderUsers()}
        </View>
    )
  }
}

const styles = {
    containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignContent: "center",
    marginLeft: 10,
    marginRight: 10
  },
  cardContainerStyle: {
    marginBottom: 10 
  }
}

export {LeaderboardList};
