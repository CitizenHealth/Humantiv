import React, { Component } from "react";
import {convertUNIXTimeToString} from "../../business/Helpers";
import { 
  View,
  FlatList
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
import {ActivityFeedTypes, primaryBackgroungColor} from '../themes/theme';
import Swipeout from 'react-native-swipeout';

class Feed extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onSwipe: PropTypes.func,
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
    filters: PropTypes.object
  };

  static defaultProps = {
    width: 400,
    height: 50
  }

  constructor(props) {
    super(props);

    this.state = {
      activeRowKey: null
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.stories != this.props.stories || 
        nextProps.filters != this.props.filters )
      {
        return true;
      }
    return false
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
    let keys = Object.keys(stories).sort();

    const storiesArray = [];
    for (var key = 0; key < keys.length; key++) {
      storiesArray.push(stories[keys[key]]);
    }
    const storiesFeed = storiesArray.reverse().map( (story, index) => {
      if (!filteredOutStories.includes(story.type)) { 
        const id = story.id;     
        return (          
          <View 
            style = {cardContainerStyle}
            key={index}
          >
            <Swipeout
            rowId = {id}
            autoClose= {true}
            onClose={ () => {
              
            }}
            onOpen={ () => {
              console.log("OPEN: ID = " + id)
            }}
            left={ [{
              onPress: () => {
                this.props.onSwipe(id);
              },
              text: "Dismiss",
              type: "delete"
            }]}
            style = {{backgroundColor: primaryBackgroungColor}}
            >
              <ActivityCard
                width= {width}
                height= {height}
                type= {story.type}
                title= {story.title}
                preposition= {story.preposition}
                value= {story.value}
                time={convertUNIXTimeToString(story.time)}
              />
            </Swipeout>
          </View>
        );
      }
    });

    if (storiesFeed.length > 0) {
      return (
        <View>
          {storiesFeed}
        </View>
      )
    } else {
      return <View/>
    }
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
