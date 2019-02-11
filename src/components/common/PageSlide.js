import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import {theme, primaryBlueColor} from '../themes/theme';

class PageSlide extends PureComponent {
  render() {
    const style = {
      backgroundColor: this.props.backgroundColor,
      paddingTop: this.props.topSpacer,
      paddingBottom: this.props.bottomSpacer,
    }
    const {
      tutorialTextStyle,
      tutorialTileTextStyle
    } = theme;

    return (
      <View style={[styles.mainContent, style]}>
        <Text style={tutorialTileTextStyle}>{this.props.title}</Text>
        <Image source={this.props.image} style={this.props.imageStyle} />
        <Text style={tutorialTextStyle}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});

export {PageSlide};