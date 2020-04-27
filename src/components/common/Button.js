import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { theme } from '../themes';

class Button extends Component {
  static propTypes = {
    textStyle: ViewPropTypes.style,
    disabledStyle: ViewPropTypes.style,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element
    ]),
    accessibilityLabel: PropTypes.string,
    activeOpacity: PropTypes.number,
    allowFontScaling: PropTypes.bool,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool,
    activityIndicatorColor: PropTypes.string,
    delayLongPress: PropTypes.number,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func
//    background: (TouchableOpacity.propTypes) ? TouchableOpacity.propTypes.background : PropTypes.any,
  }

  static isAndroid = (Platform.OS === 'android')

  _renderChildren() {
    let childElements = [];
    React.Children.forEach(this.props.children, (item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        const element = (
          <Text
            style={[theme.textButtonStyle, this.props.textStyle]}
            allowFontScaling={this.props.allowFontScaling}
            key={item}>
            {item}
          </Text>
        );
        childElements.push(element);
      } else if (React.isValidElement(item)) {
        childElements.push(item);
      }
    });
    return (childElements);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(nextProps, this.props)) {
      return true;
    }
    return false;
  }

  _renderInnerText() {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator
          animating={true}
          size='small'
          style={styles.spinner}
          color={this.props.activityIndicatorColor || 'white'}
        />
      );
    }
    return this._renderChildren();
  }

  render() {
    if (this.props.isDisabled === true || this.props.isLoading === true) {
      return (
        // <View style={
        //     [styles.button, this.props.style, (theme.disabledButtonStyle || styles.opacity)]
        //   }>
        <View style={
          [theme.disabledButtonStyle,  this.props.style]
          }
        >
          {this._renderInnerText()}
        </View>
      );
    }
    // Extract Touchable props
    let touchableProps = {
      accessibilityLabel: this.props.accessibilityLabel,
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress,
      activeOpacity: this.props.activeOpacity,
      delayLongPress: this.props.delayLongPress,
      delayPressIn: this.props.delayPressIn,
      delayPressOut: this.props.delayPressOut,
    };
//     if (Button.isAndroid) {
//       touchableProps = Object.assign(touchableProps, {
// //        background: this.props.background
//         activeOpacity: 0.5
//       });
//       return (
//         <TouchableOpacity {...touchableProps}>
//           <View style={[theme.buttonStyle, this.props.style]}>
//             {this._renderInnerText()}
//           </View>
//         </TouchableOpacity>
//       )
//     } else {
      touchableProps = Object.assign(touchableProps, {
//        background: this.props.background
        activeOpacity: 0.5
      });
      return (
        <TouchableOpacity {...touchableProps}
          style={[theme.buttonStyle, this.props.style]}>
          {this._renderInnerText()}
        </TouchableOpacity>
      );
//    }
  }
}

export { Button };
