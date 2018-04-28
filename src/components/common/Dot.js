import React, { Component } from "react";
import { 
    Animated,
    Easing
} from 'react-native';
import Svg,{
    Circle,
    G
} from 'react-native-svg';

import PropTypes from 'prop-types';

class Dot extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number
    };
    
    static defaultProps = {
        color: "#dddddd",
        size: 50,
        animate: true
    }
    
    constructor(props) {
      super(props);

      this.state = {
        circleRadius: new Animated.Value(this.props.size/8),
        circleOpacity: new Animated.Value(0.3)
      };

      this.state.circleRadius.addListener( (circleRadius) => {
        if (this._myCircle !== undefined && this._myCircle) {
          this._myCircle.setNativeProps({ r: circleRadius.value.toString() });
        }
      });

      this.state.circleOpacity.addListener( (circleOpacity) => {
        if (this._myCircle !== undefined && this._myCircle) {
          this._myCircle.setNativeProps({ opacity: circleOpacity.value });
        }
      });

      this.runAnimation();
    }

    runAnimation() {
        this.state.circleRadius.setValue(this.props.size/8);
        Animated.timing(this.state.circleRadius, {
          toValue: this.props.size/4,
          duration: 2000,
          easing: Easing.none,
        }).start(() => {
          if(this.props.animate) {
            this.runOpacityAnimation();
          } else {
//            this.state.circleRadius.setValue(this.props.size/4);
          }
        });
      }

    runOpacityAnimation() {
      this.state.circleOpacity.setValue(0.3);
      Animated.timing(this.state.circleOpacity, {
        toValue: 0,
        duration: 2000,
        easing: Easing.none,
      }).start(() => {
        if(this.props.animate) {
          this.runAnimation();
        } else {
//            this.state.circleOpacity.setValue(0.3);
        }
      });
    }

    render() {
        const {
            outerCircle,
            innerCircle
        } = styles;

        let AnimatedCircle = Animated.createAnimatedComponent(Circle);
        
        return (
            <Svg
                height={(this.props.size || 100)}
                width={(this.props.size || 100)}
            >
                <AnimatedCircle 
                  ref={ ref => this._myCircle = ref } 
                  cx={(this.props.size || 100)/2}
                  cy={(this.props.size || 100)/2} 
                  style = {{opacity: 0.3}}
                  fill={this.props.color}
                />
                <Circle
                  cx={(this.props.size || 100)/2}
                  cy={(this.props.size || 100)/2}
                  r={this.props.size/8}
                  fill={this.props.color}
                />
            </Svg>
        )
    }
};

const styles = {
    outerCircle: {
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        opacity: 1,
    }
}

export {Dot};