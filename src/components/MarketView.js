import React, {Component} from 'react';
import { 
	View, 
	Text, 
	StyleSheet ,
	Image,
	Dimensions
} from 'react-native';
import Images from '../resources/images';
import {
	theme,
	primaryBackgroungColor,
	graphGreyColor
} from '../components/themes';
import { scale } from 'react-native-size-matters';
import {Fonts} from '../resources/fonts/Fonts';

class MarketView extends Component {
	render() {
		const {
			tutorialTextStyle,
			tutorialTileTextStyle,			
		} = theme;

		const {
			pageContainerStyle,
			imageStyle,
			imageContainerStyle,
			textContainerStyle,
			headerStyle,
      textStyle
		} = styles;

		return (
			<View style={pageContainerStyle}>
				<View style={headerStyle}>
					<Text style={textStyle}> Marketplace </Text>               
				</View>
				<View
					style={imageContainerStyle}
				>
					<Image
						style={imageStyle}
						source= {Images.img_market}
					/>
				</View>
				<View
					style = {textContainerStyle}
				>
					<Text style={tutorialTileTextStyle}>
						Coming Very Soon
					</Text>
					<Text style={[tutorialTextStyle, {margin: scale(20)}]}>
						Spend your earned medits on wearables, health supplements, and medical services and many more exciting offerings.
					</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  pageContainerStyle: {
		flex: 1,
		backgroundColor: primaryBackgroungColor
	}, 
	imageStyle: {
		width: Dimensions.get('window').width - 40,
		height: Dimensions.get('window').width - 40,
	},
	imageContainerStyle: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainerStyle: {
		flex: 1,
		justifyContent: 'flex-start',
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
});

export default MarketView;