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
import {LeaderboardPodium} from '../common';
import {ActivityFeedTypes, primaryBackgroungColor, primaryWhiteColor} from '../themes/theme';
import * as Animatable from 'react-native-animatable';

class LeaderboardHeader extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    users: PropTypes.arrayOf(
      PropTypes.shape(
        {
          name: PropTypes.string,
          image: PropTypes.string,
          medit: PropTypes.number,
          uniticon: PropTypes.string,
          direction: PropTypes.string,
          selected: PropTypes.bool,
          anonymous: PropTypes.bool
        }
      )
    )
  };

  static defaultProps = {
    width: 400,
    height: 50
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
    if (nextProps.users != this.props.users )
      {
        return true;
      }
    return false
  }
  
  renderUser(rank) {
    const {
        width,
        height,
        users,
    } = this.props;

    const {cardContainerStyle} = styles;
		const user = (users.length >= rank) ? users[rank-1] : {
			name: "Null",
			image: "",
			medit: 0,
			uniticon: "",
			direction: ""
		};
  
    user.rank = rank; 
    var animation = "fadeInDown";
    switch (rank) {
      case 1:
        animation = "fadeInDown";
        break;
      case 2:
        animation = "fadeInLeft";
        break;
      case 3:
        animation = "fadeInRight";
        break;
      default:
        animation = "fadeInDown";
        break;
    }
		return (users.length >= 1) ? (          
      <Animatable.View 
        animation={animation}
//        delay= {250*rank}
        style = {cardContainerStyle}
        key = {rank}
      >
				<LeaderboardPodium
					rank = {rank}
					user = {user}
				/>
			</Animatable.View >
		) : (
			<View/>
		);
	};

  render() {
    const {
        containerStyle,
        cardContainerStyle
    } = styles;

    return (
        <View style={containerStyle}>
          {this.renderUser(2)}
          {this.renderUser(1)}
          {this.renderUser(3)}
        </View>
    )
  }
}

const styles = {
    containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
		alignContent: "center",
		marginBottom: 30,
		marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderColor: "#ddd",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    backgroundColor: primaryWhiteColor
  },
  cardContainerStyle: {
    marginBottom: 10 
  }
}

export {LeaderboardHeader};
