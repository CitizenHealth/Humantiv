import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import {
  medifluxMainColor, 
  medifluxWhiteColor,
  medifluxGreyColor
} from '../views/Colors';
import PropTypes from 'prop-types'
import Images from '../images/images';
import {DataSourceCard} from './DataSourceCard';

class DataSourceBoard extends Component {

  static propTypes = {
    sources: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.any,
      selected: PropTypes.bool,
      onSelect: PropTypes.func
    }))
  };

  constructor(props) {
    super(props)
  }

  renderTiles() {
    const {sources} = this.props;
    const screenWidth = Dimensions.get('window').width;
    const graphCardWidth = (screenWidth - 39)/3;

    let sourcePairs = [];
    for (var index = 0; index < sources.length; index ++) {
      let pair = [sources[index]];
      index++;
      if (index < sources.length) {
        pair.push(sources[index]);
      }
      index++;
      if (index < sources.length) {
        pair.push(sources[index]);
      }
      sourcePairs.push(pair);
    }

    return (
      sourcePairs.map( (item, index) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              key: {index}
            }}
          >
            <DataSourceCard
              title= {item[0].title}
              image= {item[0].image}
              width= {graphCardWidth}
              height= {graphCardWidth}
              selected= {item[0].selected}
              onSelect= {item[0].onSelect}
            />
            {(item.length > 1) ? 
                <DataSourceCard
                title= {item[1].title}
                image= {item[1].image}
                width= {graphCardWidth}
                height= {graphCardWidth}
                selected= {item[1].selected}
                onSelect= {item[1].onSelect}
              /> : <View></View>
            }
            {(item.length > 2) ? 
                <DataSourceCard
                title= {item[2].title}
                image= {item[2].image}
                width= {graphCardWidth}
                height= {graphCardWidth}
                selected= {item[2].selected}
                onSelect= {item[2].onSelect}
              /> : <View></View>
            }
          </View>
        )
      })
    )
  }

  render() {
    var {sources} = this.props;
    var {
      cardsContainer,
      cardsStyle
    } = styles;

    const screenWidth = Dimensions.get('window').width;
    const graphCardWidth = (screenWidth-35)/3;
    const rows = Math.ceil(sources.length/3);
    const tilesSeparatorHeight = 0;
    return (
      <View style={
        [cardsContainer,
        {height: rows*graphCardWidth+tilesSeparatorHeight}]}>
         <ScrollView > 
          <View style={cardsStyle}>
            {this.renderTiles()}
          </View>
        </ScrollView > 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardsStyle: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "column"
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    alignContent: "center"
  }
})
export {DataSourceBoard};
