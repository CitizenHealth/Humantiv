import React, {
    Component,
  } from 'react';
import { 
    AppRegistry,
    StyleSheet,
    View,
    StatusBar,
    Platform
 } from 'react-native';
import App from './src/App';
import 'babel-polyfill';

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
  
  class DarkTheme extends Component {
    render() {
      return (
        <View style={styles.container}>
            <App />
        </View>
      );
    }
  }
  
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    statusBar: {
      height: STATUSBAR_HEIGHT,
    },
    appBar: {
      backgroundColor:'#79B45D',
      height: APPBAR_HEIGHT,
    },
    content: {
      flex: 1,
      backgroundColor: '#33373B',
    },
  });
  
AppRegistry.registerComponent('Humantiv', () => DarkTheme);
