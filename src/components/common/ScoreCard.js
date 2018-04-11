import React, { Component } from "react";
import { 
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { theme, primaryBlueColor } from '../themes';
import PropTypes from 'prop-types';
import Images from "../../resources/images";
import {IconButton} from './IconButton';
import {Icon} from './Icon';

class ScoreCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    buttonTitle: PropTypes.string,
    backgroundColor: PropTypes.string,
    titleColor: PropTypes.string,
    buttonTitleColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    title: "Health graph",
    buttonTitle: "Add data source",
    backgroundColor: "#fff",
    titleColor: "#757b86",
    buttonTitleColor: "#3598fe",
    width: undefined,
    height: undefined
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      cardTitleStyle,
      cardTitleContainerStyle,
      cardContainerStyle,
      headerContainerStyle,
      imageStyle,
      cardButtonTitleStyle,
      buttonStyle
    } = styles;

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
                  onPress={this.props.onPress}
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
  cardTitleContainerStyle: {
    padding: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    flexDirection: "row",
    backgroundColor: "#fff"
  },
  cardTitleStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#757b86",
    paddingLeft: 10
  },
  cardButtonTitleStyle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#3598fe",
    paddingLeft: 10
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
