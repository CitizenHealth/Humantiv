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
  primaryGreenColor, 
  primaryGreyColor, 
  graphGreyColor,
  graphGreenColor,
  graphRedColor
} from '../themes';
import PropTypes from 'prop-types';
import Images from "../../resources/images";
import {IconButton} from './IconButton';
import {Icon} from './Icon';
import {Fonts} from '../../resources/fonts/Fonts';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { scale } from "react-native-size-matters";
import {formatNumbers} from '../../business/Helpers';


class PriceGraphCard extends Component {
  static propTypes = {
    type: PropTypes.string,
    buttonTitle: PropTypes.string,
    graphColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array
  };

  static defaultProps = {
    type: "medit",
    buttonTitle: "Add data source",
    graphColor: primaryBlueColor,
    width: undefined,
    height: undefined,
    data: [],
  }

  constructor(props) {
    super(props); 
  }

  render() {
    const {
      cardTitleStyle,
      cardTitleContainerStyle,
      cardValueContainerStyle,
      cardContainerStyle,
      headerContainerStyle,
      cardSubtitleStyle,
      titleContainer,
      valueContainer,
      cardSubvalueStyle,
      cardValueStyle,
    } = styles;

    const {
      iconStyle,
      iconTextStyle
    } = theme;

    const {
      data
    } = this.props;

    let currentValue = data[data.length-1];
    let lastValue = data[data.length-2];

    let diffValue = (currentValue - lastValue).toFixed(2);
    let sign = (diffValue >= 0) ? "+" : "";
    let diffPercentage = ((100*diffValue)/lastValue).toFixed(2);

    return (
      <View style={[cardContainerStyle, {backgroundColor: this.props.backgroundColor}]}>
        <View style={headerContainerStyle}>
          <View style={titleContainer}>
            <View style={cardTitleContainerStyle}>
              <Text style={cardTitleStyle}>
                {(this.props.type == "medit") ? "Medit" : "Medex"}
              </Text>
            </View>
            <View style={cardTitleContainerStyle}>
              <Icon
                name={(this.props.type == "medit") ? "medit" : "medex"}
                color= {(this.props.type == "medit") ? primaryBlueColor : primaryGreenColor}
                size= {16}/>
              <Text style={cardSubtitleStyle}>
                {(this.props.type == "medit") ? "MDT" : "MDX"}
              </Text>
            </View>
          </View>
          <View style={valueContainer}>
            <View style={cardValueContainerStyle}>
              <Text style={cardValueStyle}>
                {(this.props.type == "medit") ? 
                `${formatNumbers(currentValue)} $` 
                : `${formatNumbers(currentValue)} $`}
              </Text>
            </View>
            <View style={cardValueContainerStyle}>
              <Text style={[cardSubvalueStyle, {
                color: (sign === "+") ? graphGreenColor : graphRedColor
              }]}>
                {(this.props.type == "medit") ? 
                `${sign}${diffValue} (${sign}${diffPercentage} %)` : 
                `${sign}${diffValue} (${sign}${diffPercentage} %)`}
              </Text>
            </View>
          </View>
        </View>
        <AreaChart
                style={{
                   height: scale(250),
                  }}
                data={ data }
                contentInset={{ top: 50, bottom: 50}}
                curve={ shape.curveNatural }
                start= {0}
                animate= {true}
                svg={{
                  strokeWidth: 1, 
                  stroke: primaryBlueColor, 
                  fill: primaryBlueColor, 
                  fillOpacity: 0.3 
                }}
            >
        </AreaChart>
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
    margin: 10
  },
  headerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60, 
    marginTop: 20
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  valueContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  cardTitleContainerStyle: {
    justifyContent: "flex-end",
    alignItems: 'center',
    flexDirection: "row",
    paddingLeft: 15
  },
  cardValueContainerStyle: {
    justifyContent: "flex-end",
    alignItems: 'center',
    flexDirection: "row",
    paddingRight: 15
  },
  cardTitleStyle: {
    fontSize: 28,
    fontWeight: "400",
    color: graphGreyColor,
    fontFamily: Fonts.regular
  },
  cardSubtitleStyle: {
    fontSize: 18,
    fontWeight: "400",
    color: primaryGreyColor,
    fontFamily: Fonts.regular,
    marginLeft: 8,
  },
  cardValueStyle: {
    fontSize: 28,
    fontWeight: "400",
    color: graphGreyColor,
    fontFamily: Fonts.regular
  },
  cardSubvalueStyle: {
    fontSize: 18,
    fontWeight: "400",
    color: primaryGreenColor,
    fontFamily: Fonts.regular
  }
});

export { PriceGraphCard };
