import React, { Component } from "react";
import { 
  Text, 
  View,
  StyleSheet,
	Image,
	Dimensions
} from "react-native";
import { 
    theme, 
    primaryGreyColor,
    primaryBlueColor, 
    graphGreenColor,
    graphOrangeColor,
    graphRedColor,
		graphGreyColor,
		primaryWhiteColor,
    ActivityFeedTypes
} from '../themes';
import PropTypes from 'prop-types';
import {Fonts} from '../../resources/fonts/Fonts';
import {Icon} from '../common';
import Images from "../../resources/images";
import {scale} from 'react-native-size-matters';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {formatNumbers} from '../../business/Helpers';
import {primaryGreenColor} from '../themes/theme';

class LeaderboardCard extends Component {
	static propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageurl: PropTypes.string,
        rank: PropTypes.number.isRequired,
				points: PropTypes.number.isRequired,
				uniticon: PropTypes.string.isRequired,
				direction: PropTypes.string.isRequired
		}),
    width: PropTypes.number,
    height: PropTypes.number,
    selected: PropTypes.bool
  };

  static defaultProps = {
    width:  Dimensions.get('screen').width,
    height: 80,
		selected: false,
		user: {
			name: "Billy Boy",
			imageurl: "",
			rank: 4,
			points: 23156,
			uniticon: "medit",
			direction: "up"
		}
  }

  constructor(props) {
		super(props);
		
  }

	renderRank() {
		const {user} = this.props;
		const {
			iconContainerStyle,
			rankStyle
		} = styles;

		return (user.direction === "up") ? 
			<View 
				style={iconContainerStyle}
			>
				<FontAwesome
					style={{
						color: graphGreenColor,
						fontSize: 20,
					}}
				>
					{Icons.caretUp}
				</FontAwesome>
				<Text style={rankStyle}>
					{user.rank}
				</Text>
				<FontAwesome
					style={{
						color: 'transparent',
						fontSize: 20,
					}}
				>
					{Icons.caretDown}
				</FontAwesome>
			</View>
		 : 
			<View 
			style={iconContainerStyle}
			>
				<FontAwesome
					style={{
						color: 'transparent',
						fontSize: 20,
					}}
				>
					{Icons.caretUp}
				</FontAwesome>
				<Text style={rankStyle}>
					{user.rank}
				</Text>
				<FontAwesome
					style={{
						color: graphRedColor,
						fontSize: 20,
					}}
				>
					{Icons.caretDown}
				</FontAwesome>
			</View>
	}

	fgColor() {
		const {selected} = this.props;

		return (selected) ? primaryWhiteColor: primaryBlueColor;
	}

	fgTitleColor() {
		const {selected} = this.props;

		return (selected) ? primaryWhiteColor: graphGreyColor;
	}

	bgColor() {
		const {selected} = this.props;

		return (selected) ? primaryBlueColor : primaryWhiteColor;
	}

  render() {
    const {
				mainViewStyle,
				leftViewStyle,
				rightViewStyle,
        cardStyle,
        valueContainerStyle,
        textContainerStyle,
        messageContainerStyle,
        titleStyle,
        timeContainerStyle,
				valueStyle,
				valyContainerStyle
    } = styles;

    const {
        user,
				selected,
        width,
        height
    } = this.props;

    return (
    <View style={[mainViewStyle, {
          width: width,
          height: height
      }]}>
			<View
				style={leftViewStyle}
		  >
			{this.renderRank()}
			</View>
			<View
				style={rightViewStyle}
			>
				<View
					style={[cardStyle, {backgroundColor: this.bgColor()}]}
				>
					<Image 
            style={{ 
              width: height/2, 
							height: height/2,
							borderRadius: height/4,
							marginLeft: 10,
            }} 
            source={{uri: user.imageurl}} 
          /> 
					<View style={textContainerStyle}>
						<Text 
							numberOfLines={1}
							style={[titleStyle,
						{color: this.fgTitleColor()}]}>
								{user.name}
						</Text>
						<View 
							style={valueContainerStyle}
						>
							<Icon
								name={user.uniticon}
								color= {this.fgColor()}
								size= {12}
							/>
							<Text 
								style={
									[valueStyle,
									{color: this.fgColor()}]}
							>
									{formatNumbers(user.points)}
							</Text>
						</View>
					</View>
				</View>
			</View>
    </View>
    );
  }
};

const styles = StyleSheet.create({
	mainViewStyle: {
		flexDirection: 'row'
	},
	leftViewStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	rightViewStyle: {
		flex: 6
	},
  cardStyle: {
		flex: 1,
		alignItems: 'center',
		marginTop: scale(10),
		marginBottom: scale(10),
		marginRight: scale(20),
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 45,
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderColor: "#ddd",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1
  },    
  iconContainerStyle: {
    justifyContent: 'center',
		alignItems: 'center'
  },
  valueContainerStyle: {
		flex: 1,
		flexDirection: 'row',
    justifyContent: 'flex-end',
		alignItems: 'center'
  },
  textContainerStyle: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 5,
		marginRight: 10
  },
  messageContainerStyle: {
      flex:1,
      flexDirection: 'row',
      alignItems: 'flex-end',
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: "400",
    textAlignVertical: 'center',
    color: graphGreyColor,
    fontFamily: Fonts.regular,
    marginLeft: 4,
	},
	rankStyle: {
    fontSize: 20,
    fontWeight: "400",
    textAlignVertical: 'center',
    color: graphGreyColor,
		fontFamily: Fonts.regular,
	},
  timeContainerStyle: {
    flex: 1,
    alignItems: 'flex-start',
  },
  valueStyle: {
    fontSize: 16,
    fontWeight: "400",
    textAlignVertical: 'center',
		fontFamily: Fonts.regular,
		marginLeft: 3
  },
});

export { LeaderboardCard };