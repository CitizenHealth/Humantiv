import React, { Component } from "react";
import { 
  View
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
import {ActivityCard} from './ActivityCard';
import { 
    dataSave,
    dataFetch
} from "../../actions";
import {connect} from "react-redux";


class Feed extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    width: 400,
    height: 50
  }

  constructor(props) {
    super(props);
    const {
        data, 
        rules
    } = props;
  }

  componentWillMount() {
    this.props.dataFetch({type: "feed"});
  }

  render() {
    const {containerStyle} = styles;

    return (
        <View style={containerStyle}>

        </View>
    )
  }
}

const styles = {
    containerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
    }
}

const mapStateToProps = (state) => {
    const {children} = state.data;

    return {
        children
    }
}

export default connect(mapStateToProps, {dataSave, dataFetch})(Feed);
