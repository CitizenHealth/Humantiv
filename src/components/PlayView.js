import React, {Component} from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
	SafeAreaView,
	ScrollView,
	Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import {Fonts} from '../resources/fonts/Fonts';
import {
	LeaderboardHeader,
	LeaderboardList
} from './custom';
import {scale} from 'react-native-size-matters';
import {
	leaderboardFetch
} from '../actions'
import { 
	graphGreyColor,
	primaryBackgroungColor
 } from './themes';

class PlayView extends Component {

	componentDidMount() {
		this.props.leaderboardFetch();
	}

	render() {
		const {
				headerStyle,
				textStyle
		} = styles;
		const {
			leaderboard
		} = this.props;

		const screenWidth = Dimensions.get('window').width;

		return (
      <ScrollView style={{
				flex: 1,
				backgroundColor: primaryBackgroungColor
			}}>
				<View style={headerStyle}>
					<Text style={textStyle}> Leaderboard </Text>               
				</View>
				<LeaderboardHeader
					selected = {true}
					users = {leaderboard}
				/>   

        <LeaderboardList
          size = {screenWidth - scale(40)}
          style = {{marginBottom: 5}}
          start = {4}
          users = {leaderboard}
        />
      </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
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

const mapStateToProps = state => {
	const {leaderboard} = state.play;
	
	return {
		leaderboard
	}
}

export default connect(mapStateToProps, {
	leaderboardFetch
})(PlayView);