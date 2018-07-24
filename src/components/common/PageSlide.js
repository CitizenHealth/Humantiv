import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {primaryBlueColor} from '../themes/theme';

class PageSlide extends PureComponent {
  render() {
    const style = {
      backgroundColor: this.props.backgroundColor,
      paddingTop: this.props.topSpacer,
      paddingBottom: this.props.bottomSpacer,
    }
    return (
      <View style={[styles.mainContent, style]}>
        <Text style={styles.title}>{this.props.title}</Text>
        <Image source={this.props.image} style={this.props.imageStyle} />
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: primaryBlueColor,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '300',
    paddingHorizontal: 16,
    marginBottom: 5,
    ...Platform.select({
        ios: { fontFamily: "Arial", },
        android: { fontFamily: "Roboto" }
    })
  },
  title: {
    fontSize: 24,
    color: primaryBlueColor,
    fontWeight: '400',
    paddingHorizontal: 16,
    ...Platform.select({
        ios: { fontFamily: "Arial", },
        android: { fontFamily: "Roboto" }
    })
  }
});

export {PageSlide};