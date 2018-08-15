import React, { Component } from "react";
import { 
  Text, 
  View,
  StyleSheet
} from "react-native";
import { 
    graphGreenColor,
    graphRedColor,
    graphGreyColor
} from '../themes';
import PropTypes from 'prop-types';
import {Fonts} from '../../resources/fonts/Fonts'
import {Dot} from './Dot';
import { 
  Defs, 
  LinearGradient, 
  Stop, 
  Circle,
  Svg,
  Rect
} from 'react-native-svg'
import { YAxis, XAxis, BarChart, Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape';
import {primaryGreyColor, primaryBlueColor, primaryWhiteColor} from '../themes/theme';
import { scale } from "react-native-size-matters";
import {convertUNIXTimeToSince, convertUnixTimeToDay} from "../../business/Helpers";

const MAX_SERIES_NUMBER = 15;

class GraphBarCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    unit: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        time: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired
    })),
    rules: PropTypes.shape({
        absoluteMin: PropTypes.number.isRequired,
        absoluteMax: PropTypes.number.isRequired,
        healthyMin: PropTypes.number.isRequired,
        healthyMax: PropTypes.number.isRequired
    }),
    width: PropTypes.number,
    height: PropTypes.number,
    timestamp: PropTypes.number
  };

  static defaultProps = {
    title: "",
    unit: "",
    data: [],
    rules: {},
    width: 200,
    height: 200,
    timestamp: null
  }

  constructor(props) {
    super(props);
    const {
        data, 
        rules
    } = props;

    this.state = {
        value: "-",
        timestamp: "",
        color: graphGreyColor
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      data, 
      rules
    } = nextProps;

    if (this.state.data !== data) { 
      const latestValue = (data.length > 0 ) ? (data[0].value !== undefined) ? data[0].value : "-" : "-";
      var selectedColor = primaryBlueColor;
      // var selectedColor = graphGreyColor;

      // if (latestValue !== "-") {
      //     if (latestValue < rules.healthyMin || latestValue > rules.healthyMax) {
      //         selectedColor = graphRedColor;
      //     } else {
      //         selectedColor = graphGreenColor;
      //     }
      // }
      this.setState({
          value: latestValue,
          color: selectedColor
      });
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

    // convert data to array
    var dataArray = []; 
    let index = 0;
    for (var i = 0; i < Math.min(MAX_SERIES_NUMBER, data.length); i++) {
      if (data[i].value !== undefined) {
        dataArray[index++] = data[i].value;
      }
    }
    const size = 24;

    const dataFinal = dataArray.reverse();

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
                    size= {size}
                    color= {this.state.color}
                    animate= {(this.state.color===graphGreyColor) ? false : true}
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
                  height: height/2,
                  width: width-30
                }
            ]}>
              <View
                width ={(width || 100) -30}
                height ={(height || 100)/2}               
              >
                <View
                  style={{
                    backgroundColor: primaryGreyColor,
                    opacity: 0.3,
                    position: "absolute",
                    bottom: 20
                  }}
                  width ={(width || 100) -30}
                  height = {1}                
                />
                
                <BarChart
                    style = {{
                      height: height/2,
                      width: width -30
                    }} 
                    x={0}
                    y={0}          
                    data={ (dataArray.length === 0) ? [1] : dataFinal }
                    animate= {true}
                    animationDuration = {1000}
                    showGrid= {true}
                    contentInset={ { top: 5, bottom: 26 } }
                    numberOfTicks= {1}
                    spacingInner= {scale(0.5)}
                    spacingOuter= {scale(0.0)}
                    svg={{
                      fill: primaryBlueColor,
                    }}
                  >
                  <Grid />
                </BarChart>
              </View>
          </View>    
        </View> 
        <View style={{
          flexDirection: "row",
          justifyContent:"flex-end",
          position: 'absolute',
          bottom: scale(3),
          right: scale(3)
        }}>
          <Text style={{
            fontSize: 10,
            fontWeight: "400",
            fontFamily: Fonts.regular,
            color: graphGreyColor
          }}>
              {(this.props.timestamp) ? convertUNIXTimeToSince(this.props.timestamp) : ""}
          </Text>
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
    elevation: 1
  },    
  headerContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  graphAreaStyle: {
    opacity: 1
  },
  graphContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

export { GraphBarCard };
