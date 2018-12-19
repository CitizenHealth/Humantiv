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
import {DataSourceCard} from './DataSourceCard';
import {scale} from 'react-native-size-matters';

class DataSourceBoard extends Component {

  static propTypes = {
    sources: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.any,
      selected: PropTypes.bool,
      onSelect: PropTypes.func,
      columns: PropTypes.number
    }))
  };

  static defaultProps = {
    columns: 3
  }

  constructor(props) {
    super(props)
  }

  renderTiles() {
    const {sources,columns} = this.props;
    const screenWidth = Dimensions.get('screen').width;
    const modalBorders = scale(15);
    const cardDividerWidth = scale(10);
    const graphCardWidth = (screenWidth-2*modalBorders-(columns+1)*cardDividerWidth)/columns;

    let sourceRow = [];
    for (var index = 0; index < sources.length; index ++) {
      let series = [sources[index]];
      for (var number = 1; number < columns; number++) {
        index++;
        if (index < sources.length) {
          series.push(sources[index]);
        }
      }
      sourceRow.push(series);
    }

    return (
      sourceRow.map( (item, index) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginLeft: cardDividerWidth,
              marginTop: cardDividerWidth,
              marginRight: cardDividerWidth
            }}
            key= {index}
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
                <View
                  style= {{
                    width: cardDividerWidth
                  }}
                />
                : <View></View>}
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
                <View
                  style= {{
                    width: cardDividerWidth
                  }}
                />
                : <View></View>}
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
    var {
      sources,
      columns
    } = this.props;
    var {
      cardsContainer,
      cardsStyle
    } = styles;

    const screenWidth = Dimensions.get('window').width;
    const modalBorders = scale(15);
    const cardDividerWidth = scale(10);
    const graphCardWidth = (screenWidth-2*modalBorders-4*cardDividerWidth)/columns;
    const rows = Math.ceil(sources.length/3);
    const tilesSeparatorHeight = 10;
    return (
      <View style={
        cardsContainer}>
         <ScrollView > 
            {this.renderTiles()}
        </ScrollView > 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardsStyle: {
    flexDirection: "column"
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: "center"
  }
})
export {DataSourceBoard};
