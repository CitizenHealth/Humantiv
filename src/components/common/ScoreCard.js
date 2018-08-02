import React, { Component } from "react";
import { 
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { 
  theme, 
  primaryBlueColor,
  primaryGreyColor,
  graphGreyColor
 } from '../themes';
import PropTypes from 'prop-types';
import Images from "../../resources/images";
import {IconButton} from './IconButton';
import {Icon} from './Icon';
import {Fonts} from '../../resources/fonts/Fonts'

class ScoreCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    buttonTitle: PropTypes.string,
    footerTitle: PropTypes.string,
    backgroundColor: PropTypes.string,
    titleColor: PropTypes.string,
    buttonTitleColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    footerDisabled: PropTypes.bool
  };

  static defaultProps = {
    title: "Health graph",
    buttonTitle: "Add data source",
    footerTitle: "Sync with devices",
    backgroundColor: "#fff",
    titleColor: graphGreyColor,
    buttonTitleColor: primaryBlueColor,
    footerDisabled: true,
    width: undefined,
    height: undefined
  }

  constructor(props) {
    super(props);
  }

  renderFooter() {
    const {
      footerContainerStyle,
      cardTitleContainerStyle,
      cardFooterButtonTitleStyle
      } = styles;

    const {
      iconStyle,
      iconTextStyle
    } = theme;

    return (<View style={footerContainerStyle}>
          {(this.props.title) ?
            <View style={cardTitleContainerStyle}>
            <IconButton
                  onPress={this.props.onPressFooter}
                  viewStyles={iconStyle}
                  textStyles={[iconTextStyle, {color:graphGreyColor}]}
                  disabled={this.props.footerDisabled}
                >
                <Icon 
                  name="plus_grey"
                  color={(this.props.footerDisabled) ? primaryGreyColor : graphGreyColor}
                />
              </IconButton>
              <Text style={
                [cardFooterButtonTitleStyle, {
                  color: (this.props.footerDisabled) ? primaryGreyColor : graphGreyColor
                }]
                }>
                {this.props.footerTitle}
              </Text>
            </View>
          : null}
        </View>
    )
  }

  render() {
    const {
      cardTitleStyle,
      cardTitleContainerStyle,
      cardContainerStyle,
      headerContainerStyle,
      imageStyle,
      cardButtonTitleStyle,
      buttonStyle,
    } = styles;

    const {
      iconStyle,
      iconTextStyle
    } = theme;

    return (
      <View style={[cardContainerStyle, {backgroundColor: this.props.backgroundColor}]}>
        <View style={headerContainerStyle}>
          {(this.props.title) ?
            <View style={cardTitleContainerStyle}>
              <Text style={cardTitleStyle}>
                {this.props.title}
              </Text>
            </View>
          : null}
          {(this.props.buttonTitle) ?
            <View style={cardTitleContainerStyle}>
                <IconButton
                  onPress={this.props.onPressHeader}
                  viewStyles={iconStyle}
                  textStyles={iconTextStyle}
                >
                <Icon name="plus_blue"/>
              </IconButton>
              <Text style={cardButtonTitleStyle}>
                {this.props.buttonTitle}
              </Text>
            </View>
          : null}
        </View>
        {this.props.children}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  headerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    borderBottomWidth: 1,
    borderColor: "#ddd",  
  },
  footerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderColor: "#ddd",  
  },
  cardTitleContainerStyle: {
    padding: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
    flexDirection: "row"
  },
  cardTitleStyle: {
    fontSize: 18,
    fontWeight: "400",
    color: graphGreyColor,
    paddingLeft: 10,
    fontFamily: Fonts.regular
  },
  cardButtonTitleStyle: {
    fontSize: 14,
    fontWeight: "400",
    color: primaryBlueColor,
    fontFamily: Fonts.regular,
    paddingRight: 10
  },
  cardFooterButtonTitleStyle: {
    fontSize: 14,
    fontWeight: "400",
    color: graphGreyColor,
    fontFamily: Fonts.regular
  },
  imageStyle: {
    flex: 1,
    height: 60,
    width: 60,
    resizeMode: "contain"
    // shadowOffset:{  width: 5,  height: 5,  },
    // shadowColor: "grey",
    // shadowOpacity: 0.7
  }
});

export { ScoreCard };
