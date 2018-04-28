import React, { Component } from "react";
import { 
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { 
  theme, 
  primaryBlueColor, 
  primaryGreenColor, 
  graphGreyColor,
  highlightedGreenColor,
  highlightedGreyColor
} from '../themes';
import PropTypes from 'prop-types';
import {Icon} from './Icon';
import {Fonts} from '../../resources/fonts/Fonts';
import { scale } from "react-native-size-matters";

const screenWidth = Dimensions.get('window').width;

class JourneyCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    content: PropTypes.string,
    selected: PropTypes.bool,
    size: PropTypes.number,
    onSelected: PropTypes.func,
  };

  static defaultProps = {
    title: "Lorem ipsum dolor sit amet, pro noster fierent corrumpit ea.",
    icon: "trophee",
    content: "Lorem ipsum dolor sit amet, pro noster fierent corrumpit ea. Pro impetus qualisque at, qui ne singulis scripserit comprehensam, illum iusto ne nec. Eam cu verear deleniti iudicabit.",
    selected: false,
    size: screenWidth - scale(40)
  }

  constructor(props) {
    super(props); 

    this.state = {
      selected: props.selected
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.selected !==nextProps.selected) {
      this.setState({selected: nextProps.selected});
    }
  }

  setSelectedState(selected) {
    this.setState({selected: selected})
    this.props.onSelected(selected);
  }
  render() {
    const {
      cardContainerStyle,
      textContainerStyle,
      titleContainerStyle,
      titleTextStyle,
      contentContainerStyle,
      contentTextStyle,
      iconContainerStyle,
    } = styles;

    const {
      iconStyle,
      iconTextStyle
    } = theme;

    return (
      <TouchableOpacity
        onPress={() => {this.setSelectedState(!this.state.selected)}}
      >
      <View style={[cardContainerStyle, {
          height: this.props.size /2.5,
          width: this.props.size,
          borderColor: (this.state.selected) ? highlightedGreenColor : "#ddd",
          shadowColor: (this.state.selected) ? highlightedGreenColor : "#000", 
          shadowOffset: (this.state.selected) ? { width: 3, height: 3 } : { width: 0, height: 3 },
          elevation: (this.state.selected) ? 5 : 1,        
        }, this.props.style ]}>
        <View style={[iconContainerStyle,
            {
              width: this.props.size/6.3,
              marginTop: this.props.size/19
            }
          ]}>
          <Icon
            name={this.props.icon}
            color= {(this.state.selected) ? highlightedGreenColor : highlightedGreyColor}
            size= {scale(32)}
          />
        </View>
        <View style={textContainerStyle}>
          <View style={titleContainerStyle}>
            <Text style={[titleTextStyle,
              {
                color: (this.state.selected) ? highlightedGreenColor : graphGreyColor
              }
            ]}>
              {this.props.title}
            </Text>
          </View>
          <View style={contentContainerStyle}>
            <Text style={[contentTextStyle,
              {
                color: (this.state.selected) ? highlightedGreenColor : highlightedGreyColor
              }
            ]}>
              {this.props.content}
            </Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 3,
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  textContainerStyle: {
    flex: 1
  },
  titleContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  titleTextStyle: {
    fontSize: 16,
    fontWeight: "400",
    color: graphGreyColor,
    fontFamily: Fonts.regular,
    marginLeft: 10,
    marginRight: 10
  },
  contentTextStyle: {
    fontSize: 12,
    fontWeight: "400",
    color: highlightedGreyColor,
    fontFamily: Fonts.regular,
    marginLeft: 10,
    marginRight: 10
  },
  iconContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

export { JourneyCard };
