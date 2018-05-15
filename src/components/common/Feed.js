import React, { Component } from "react";
import {convertUNIXTimeToString} from "../../business/Helpers";
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
import {ActivityFeedTypes} from '../themes/theme';

class Feed extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    stories: PropTypes.objectOf(
      PropTypes.shape(
        {
          time: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          preposition: PropTypes.string,
          type: PropTypes.string.isRequired,
        }
      )
    ),
    filters: PropTypes.oneOfType(
      PropTypes.boolean
    )
  };

  static defaultProps = {
    width: 400,
    height: 50
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  
  }

  renderStories() {
    const {
        width,
        height,
        stories,
        filters
    } = this.props;

    const {cardContainerStyle} = styles;

    var filteredOutStories = [];

    if (filters) {
      Object.keys(filters).map(key => {
        if (filters[key]) {
          filteredOutStories.push(key);
        }
      });
    }

    const storiesArray = Object.values(stories);
    const storiesFeed = storiesArray.map( (story, index) => {
      if (!filteredOutStories.includes(story.type)) {
        return (<ActivityCard
            width= {width}
            height= {height}
            type= {story.type}
            title= {story.title}
            preposition= {story.preposition}
            value= {story.value}
            time={convertUNIXTimeToString(story.time)}
            key={index}
        />
        );
      }
    });

    return (
      <View style = {cardContainerStyle}>
        {storiesFeed}
      </View>
    )
  }

  render() {
    const {
        containerStyle,
        cardContainerStyle
    } = styles;

    return (
        <View style={containerStyle}>
          {this.renderStories()}
        </View>
    )
  }
}

const styles = {
    containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignContent: "center",
    marginLeft: 10,
    marginRight: 10
  },
  cardContainerStyle: {
    marginBottom: 10 
  }
}

export {Feed};
