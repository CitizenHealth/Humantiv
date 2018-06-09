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
    graphGreyColor
} from '../themes';
import PropTypes from 'prop-types';
import Images from "../../resources/images";
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
import { LineChart, AreaChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape';
import {primaryGreyColor} from '../themes/theme';

class GraphCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    unit: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        time: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired
    })),
    rules: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        healthyMin: PropTypes.number.isRequired,
        healthyMax: PropTypes.number.isRequired
    }),
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    title: "",
    unit: "",
    data: [],
    rules: {},
    width: 200,
    height: 200
  }

  constructor(props) {
    super(props);
    const {
        data, 
        rules
    } = props;

    this.state = {
        value: "-",
        color: graphGreyColor
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      data, 
      rules
    } = nextProps;

    if (this.state.data !== data) { 
      const latestValue = (data.length > 0 ) ? (data[data.length -1].value !== undefined) ? data[data.length -1].value : "-" : "-";
      var selectedColor = graphGreyColor;

      if (latestValue !== "-") {
          if (latestValue < rules.healthyMin || latestValue > rules.healthyMax) {
              selectedColor = graphRedColor;
          } else {
              selectedColor = graphGreenColor;
          }
      }
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
    for (var i = 0; i < data.length; i++) {
      if (data[i].value !== undefined) {
        dataArray[index++] = data[i].value;
      }
    }
    const size = 24;

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
                <LineChart
                    style = {{
                      height: height/2,
                      width: width -30
                    }} 
                    x={0}
                    y={0}          
                    data={ dataArray }
                    animate= {true}
                    animationDuration = {1000}
                    showGrid= {false}
                    contentInset={ { top: 25, bottom: 25 } }
                    curve= {shape.curveNatural}
                    svg={{
                        strokeWidth: 2,
                        stroke: graphGreyColor,
                    }}
                  >
                  </LineChart> 
              </View>
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

export { GraphCard };
