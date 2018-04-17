import React, { Component } from "react";
import { 
    Animated,
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
    
    render() {
        const {
            outerCircle,
            innerCircle
        } = styles;

        return (
            <Svg
                height={this.props.size}
                width={this.props.size}
            >
                <Circle
                    cx={this.props.size/2}
                    cy={this.props.size/2}
                    r={this.props.size/2}
                    opacity={0.3}
                    fill={this.props.color}
                />
                <Circle
                    cx={this.props.size/2}
                    cy={this.props.size/2}
                    r={this.props.size/4}
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