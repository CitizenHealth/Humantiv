import React, { Component } from "react";
import { 
  View
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
import {ActivityCard} from './ActivityCard';
import { 
    dataSave,
    dataFetch
} from "../../actions";
import {connect} from "react-redux";
import {ActivityFeedTypes} from '../themes/theme';


class Feed extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    width: 400,
    height: 50
  }

  constructor(props) {
    super(props);
    const {
        data, 
        rules
    } = props;
  }

  componentWillMount() {
    this.props.dataFetch({type: "feed"});
  }

  render() {
    const {
        containerStyle,
        cardContainerStyle
    } = styles;

    const {
        width,
        height
    } = this.props;

    return (
        <View style={containerStyle}>
            <View style = {cardContainerStyle}>
                <ActivityCard 
                    width= {width}
                    height= {height}
                    type= {ActivityFeedTypes.Vital.HeartRate}
                    title= "Heart rate"
                    preposition= "was"
                    value= "87 bpm"
                    time="today at 3:15 PM"
                />
            </View>
            <View style = {cardContainerStyle}>
                <ActivityCard
                    width= {width}
                    height= {height}
                    type= {ActivityFeedTypes.Activity.Swim}
                    title= "Swam"
                    preposition= "for"
                    value= "1 mile"
                    time="Yesterday at 6:12 AM"
                />
            </View>
            <View style = {cardContainerStyle}>
                <ActivityCard
                     width= {width}
                     height= {height}
                     type= {ActivityFeedTypes.Wallet.Medits}
                    title= "You've earned"
                    preposition= ""
                    value= "25 Medits"
                    time="Sunday at 10:27 AM"
                />
            </View>
            <View style = {cardContainerStyle}>
                <ActivityCard
                     width= {width}
                     height= {height}
                     type= {ActivityFeedTypes.Activity.Run}
                    title= "Ran"
                    preposition= "for"
                    value= "25 minutes"
                    time="Friday at 12:04 PM"
                />
            </View>
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

const mapStateToProps = (state) => {
    const {children} = state.data;

    return {
        children
    }
}

export default connect(mapStateToProps, {dataSave, dataFetch})(Feed);
