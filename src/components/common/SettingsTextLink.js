import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
	Dimensions,
	Linking
} from 'react-native';
import {Fonts} from '../../resources/fonts/Fonts'
import {
  highlightedGreyColor, 
  secondaryGreyColor,
  graphGreyColor, 
  primaryBlueColor,
  graphRedColor
} from '../themes'
import { scale } from "react-native-size-matters";
import PropTypes from 'prop-types';

const screenWidth = Dimensions.get('window').width;
const componentHeight = 50;

class SettingsTextLink extends Component {
  static propTypes = {
    label: PropTypes.string,
    url: PropTypes.string
  }

  static defaultProps = {
    label: "Label",
    url: ""
  }
  constructor(props) {
    super(props);

    this.state = {
      text: props.value
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.value,
      url: nextProps.url
    });
  }
  
  render() {
    const {
			label,
			url
    } = this.props;

    const {
      containerStyle,
      labelStyle
    } = styles;
    
    return(
      <View style={containerStyle}>
				<TouchableOpacity 
					style={{flex: 1}}
					onPress={() => Linking.openURL(url)}
				>
					<Text style={labelStyle}>
						{label}
					</Text>               
				</TouchableOpacity>       
      </View>
    )
  }
}
const styles = {
  containerStyle: {
    flex:1,    
    height: componentHeight,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowColor: "#000",
    borderColor: "#ddd",
    elevation: 1
  },
  labelStyle: {
    textAlignVertical: 'center',
    fontSize: 18,
    fontFamily: Fonts.regular,
    fontWeight: "400",
    color: graphGreyColor,
		marginLeft: scale(10)
  }
}

export {SettingsTextLink};


