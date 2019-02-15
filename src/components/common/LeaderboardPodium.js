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
import {primaryGreenColor, primaryBackgroungColor} from '../themes/theme';

class LeaderboardPodium extends Component {
	static propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
        rank: PropTypes.number.isRequired,
				medit: PropTypes.number,
				uniticon: PropTypes.string,
				direction: PropTypes.string
    }),
    width: PropTypes.number,
    height: PropTypes.number,
    selected: PropTypes.bool
  };

  static defaultProps = {
    width:  Dimensions.get('screen').width/3-10,
    height: 200,
		selected: false,
		user: {
			name: "Billy Boy",
			image: "",
			rank: 4,
			medit: 23156,
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

		return (
			<View 
				style={iconContainerStyle}
			>
				<FontAwesome
					style={{
						color: (user.rank === 1 || user.direction !== "up") ? 'transparent' : graphGreenColor,
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
						color: (user.rank === 1 || user.direction !== "down") ? 'transparent' : graphRedColor,
						fontSize: 20,
					}}
				>
					{Icons.caretDown}
				</FontAwesome>
			</View>
		)
	}

	fgColor() {
		const {selected} = this.props;

		return (selected) ? primaryBlueColor: primaryBlueColor;
	}

	fgTitleColor() {
		const {selected} = this.props;

		return (selected) ? graphGreyColor: graphGreyColor;
	}

	bgColor() {
		const {selected} = this.props;

		return (selected) ? primaryBlueColor : primaryWhiteColor;
	}

  render() {
    const {
			mainViewStyle,
			nameContainerStyle,
			bottomViewStyle,
			cardStyle,
			valueContainerStyle,
			textContainerStyle,
			titleStyle,
			valueStyle
    } = styles;

    const {
			user,
			selected,
			rank,
			width,
			height
    } = this.props;

		var imageSize = (user.rank === 1) ? height : ( (user.rank === 2) ? height*3/4 : height * 2/3);

		console.log(`LEADERBOARD PODIUM USER: ${user}`)
    return (
    <View style={[mainViewStyle, {
          width: width,
          height: height
    }]}>
			<View
				style={bottomViewStyle}
			>
				{this.renderRank()}
				<View
					style={[
						cardStyle, 
						{
							backgroundColor: this.bgColor(),
							width: imageSize/3+10, 
							height: imageSize/3+10,
						}
					]}
				>
					<Image 
            style={{ 
              width: imageSize/3, 
							height: imageSize/3,
							borderRadius: imageSize/6,
							margin: 5,
            }} 
            source={{uri: user.image}} 
          /> 
				</View>
				<View style={textContainerStyle}>
						<View 
							style={nameContainerStyle}
						>
							<Text 
								numberOfLines={1}
								style={[titleStyle,
								{color: this.fgTitleColor()}]}
							>
								{user.name}
							</Text>
						</View>
						<View 
							style={valueContainerStyle}
						>
							<Icon
								name={user.uniticon}
								color= {this.fgColor()}
								size= {12}
							/>
							<Text 
								numberOfLines={1}
								style={
									[valueStyle,
									{color: this.fgColor()}]}
							>
									{formatNumbers(user.medit)}
							</Text>
						</View>
					</View>
			</View>
    </View>
    );
  }
};

const styles = StyleSheet.create({
	mainViewStyle: {
		justifyContent: 'flex-start',
		flexDirection: 'column'
	},
	bottomViewStyle: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
  cardStyle: {
		alignItems: 'center',
    flexDirection: 'column',
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
		flex: 1,
    justifyContent: 'flex-end',
		alignItems: 'center'
  },
  valueContainerStyle: {
		flex: 1,
		flexDirection: 'row',
    justifyContent: 'flex-end',
		alignItems: 'center'
  },
  textContainerStyle: {
		height: 40,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	},
	nameContainerStyle: {
		flex: 1
	},
  titleStyle: {
    fontSize: 12,
    fontWeight: "400",
    textAlignVertical: 'center',
    color: graphGreyColor,
    fontFamily: Fonts.regular,
    marginLeft: 4,
	},
	rankStyle: {
    fontSize: 16,
    fontWeight: "400",
    textAlignVertical: 'center',
    color: graphGreyColor,
		fontFamily: Fonts.regular
	},
  valueStyle: {
    fontSize: 12,
    fontWeight: "400",
    textAlignVertical: 'center',
		fontFamily: Fonts.regular,
		marginLeft: 3
  },
});

export { LeaderboardPodium};