import React, {Component} from 'react';
import {JourneyCard} from './JourneyCard';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import {primaryBackgroungColor} from '../themes';

class JourneyChoice extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })),
    setSelected: PropTypes.func.isRequired,
    value: PropTypes.string
  };

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);

    this.state = {
      selected: (props.value)  ? props.value : null
    }
  }

  setSelected(key) {
    this.setState({selected: key});
    this.props.setSelected(key);
  }

  render() {
    const {containerStyle} = styles;

    return (
    <View style={containerStyle}>
      {this.props.data.map( (item, index) => {
        return (
          <JourneyCard
            title= {item.title}
            icon= {item.icon}
            content= {item.content}
            selected = {item.key === this.state.selected}
            style = {{
              marginBottom: 15,
              marginLeft: 10,
              marginRight: 10
            }}
            onSelected = {() => {this.setSelected(item.key)}}
            key = {index}
          />
        )
      })}
    </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: primaryBackgroungColor
  }
}
export {JourneyChoice};