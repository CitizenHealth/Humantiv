import React, { Component } from "react";
import { 
  Text, 
  View,
  StyleSheet,
  Image
} from "react-native";
import { 
    theme, 
    primaryBlueColor, 
    graphGreenColor,
    graphOrangeColor,
    graphRedColor,
    graphGreyColor,
    ActivityFeedTypes
} from '../themes';
import PropTypes from 'prop-types';
import Images from "../../resources/images";
import {Fonts} from '../../resources/fonts/Fonts'


class ActivityCard extends Component {
  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    preposition: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    type: ActivityFeedTypes.Community.Announcement,
    title: "",
    unit: "",
    value: "",
    preposition: "",
    width: 200,
    height: 200
  }

  constructor(props) {
    super(props);
  }

  cardImage() {
    const {type} = this.props;
    switch(this.prop) {
        case ActivityFeedTypes.Vital.HeartRate: {

            return Images.img_vote_enabled;
        }
    }
  }

  render() {
    const {
        cardStyle,
        headerContainerStyle,
        valueContainerStyle,
        valueTextStyle,
        unitTextStyle,
        titleContainerStyle,
        titleTextStyle,
        graphContainerStyle,
        graphAreaStyle
    } = styles;

    const {
        title,
        unit,
        data,
        rules,
        width,
        height
    } = this.props;

    return (
    <View style={[cardStyle, {
          width: width,
          height: height
      }]}>
        <View style={headerContainerStyle}>
            <View style={valueContainerStyle}>
                <Text style={[valueTextStyle,
                {
                    color: this.state.color
                }]}>
                    {this.state.value}
                </Text>
                <Text style={[unitTextStyle,
                    {
                        color: this.state.color
                    }]}>
                    {this.props.unit}
                </Text>
            </View>
            <View style={titleContainerStyle}>
                <Dot
                    size= {15}
                    color= {this.state.color}
                />
                <Text style={[
                    titleTextStyle,
                    {
                        color: this.state.color
                    }
                ]}>
                    {this.props.title}
                </Text>
            </View>
        </View>
        <View style={graphContainerStyle}>
            <View style={
                [graphAreaStyle,
                {
                    height: height/6,
                    width: width-20
                }
            ]}>        
            </View>    
        </View>      
    </View>
    );
  }
};

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2
  },    
  headerContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  graphAreaStyle: {
    backgroundColor: "#ddd",
    opacity: 0.5
  },
  graphContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainerStyle: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  valueTextStyle: {
    fontSize: 40,
    fontWeight: "400",
    marginBottom: -5,
    textAlignVertical: 'bottom',
    fontFamily: Fonts.regular
  },
  titleContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
 titleTextStyle: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: Fonts.regular,
    marginLeft: 5
  },
  unitTextStyle: {
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 2,
    fontFamily: Fonts.bold
  }
});

export { ActivityCard };
