import React, {Component} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  BackHandler,
  Dimensions
} from 'react-native';
import { 
  TabView, 
  TabBar,
  SceneMap, 
  NavigationState,
} from 'react-native-tab-view';
import PlayView from './PlayView';
import MarketView from './MarketView';
import HealthView from './HealthView';
import WalletView from './WalletView';
import SettingsView from './SettingsView';
import {primaryBlueColor} from './themes/theme';
import Spinner from "react-native-spinkit";
import { scale } from "react-native-size-matters";
import {
  Icon  
} from './common';
import Animated from 'react-native-reanimated';
import {Fonts} from '../resources/fonts/Fonts';

class BottomTabView extends Component {
  static title = 'Bottom bar with indicator';
  static appbarElevation = 0;

  componentWillMount() {
    var i = 2;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  
  handleBackPress = () => {
    // Exit the app 
    BackHandler.exitApp();
    return true;
  }

  state = {
    index: 0,
    routes: [
      { key: 'health', title: 'Health', icon: 'heart', color: 'transparent', index: 0 },
      { key: 'play', title: 'Play', icon: 'img_play', color: 'transparent', image: 'img_play', index: 1 },
      { key: 'market', title: 'Market', icon: 'market', color: 'transparent', index: 2 },
      { key: 'wallet', title: 'Wallet', icon: 'wallet', color: 'transparent', index: 3 },
      { key: 'settings', title: 'Settings', icon: 'settings', color: 'transparent', index: 4 },
    ],
  };

  _handleIndexChange = index =>
    this.setState({
      index,
    });

  _renderIndicator = props => {
    const { width, position } = props;
    const inputRange = [
      0,
      0.48,
      0.49,
      0.51,
      0.52,
      1,
      1.48,
      1.49,
      1.51,
      1.52,
      2,
    ];

    const scale = position.interpolate({
      inputRange,
      outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
    });
    const opacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(x => {
        const d = x - Math.trunc(x);
        return d === 0.49 || d === 0.51 ? 0 : 1;
      }),
    });
    const translateX = position.interpolate({
      inputRange: inputRange,
      outputRange: inputRange.map(x => Math.round(x) * width),
    });
    const backgroundColor = position.interpolate({
      inputRange,
      outputRange: inputRange.map(
        x => props.navigationState.routes[Math.round(x)].color
      ),
    });

    return (
      <Animated.View
        style={[styles.container, { width, transform: [{ translateX }] }]}
      >
        <Animated.View
          style={[
            styles.indicator,
            { backgroundColor, opacity, transform: [{ scale }] },
          ]}
        />
      </Animated.View>
    );
  };

  _renderIcon = ({ route, focused, color }) => {
    return (
      <Icon 
        name= {route.icon + (focused ? '_enabled' : '_disabled')}
        color={"#3599fe"}
        size= {20}
        style={styles.icon}
        image={route.icon + (focused ? '_enabled' : '_disabled')}
      />
    )
  }
  
  _renderLabel = ({ route, focused, color }) => {
    return (
      <Animated.Text style={
        [styles.label, { color: (focused) ? primaryBlueColor : '#DADDE2' }]}>
        {route.title}
      </Animated.Text>
    )
  }

  _renderBadge = ({ route }) => {
    if (route.key === 'New') {
      return (
        <View style={styles.badge}>
          <Text style={styles.count}>2</Text>
        </View>
      );
    }
    return null;
  };

  _getLabelText = ({ route }) => route.title;

  _renderLazyPlaceholder = ({ route }) => (
    <View>
      <Spinner 
        isVisible={true}
        size={scale(60)}
        type='ThreeBounce' 
        color="white"
      />
    </View>
  )
  _renderItem = ({ navigationState, position }) => ({ route, index }) => {
    const focused = navigationState.index === index;

    return (
      <View style={styles.tab}>
          <Icon 
            name= {route.icon + (focused ? '_enabled' : '_disabled')}
            color={"#3599fe"}
            size= {20}
            style={[styles.icon, styles.inactive]}
            image={route.icon + (focused ? '_enabled' : '_disabled')}
          />
          <Text style={[styles.label, (focused) ? styles.active : styles.inactive]}>{route.title}</Text>
      </View>
    );
  };

  _renderTabBar = props => (
    <View style={[styles.tabbar, {
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      }]}>
      {props.navigationState.routes.map((route, index) => {
        return (
          <TouchableWithoutFeedback
            key={route.key}
            onPress={() => props.jumpTo(route.key)}
          >
            {this._renderItem(props)({ route, index })}
          </TouchableWithoutFeedback>
        );
      })}
    </View>
//     <TabBar
//       {...props}
//       getLabelText={this._getLabelText}
//       renderIcon={this._renderIcon}
//       renderBadge={this._renderBadge}
// //      renderIndicator={this._renderIndicator(props)}
//       renderLabel={this._renderLabel}
//       scrollEnabled={false}
//       tabStyle={styles.tab}
//       indicatorStyle={{ backgroundColor: primaryBlueColor}}
//       style={styles.tabbar}
//     />
  );

  // _renderScene = SceneMap({
  //   health: HealthView,
  //   play: PlayView,
  //   market: MarketView,
  //   wallet: WalletView,
  //   settings: SettingsView,
  // });

  _renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'health':
        return <HealthView jumpTo={jumpTo} />;
      case 'play':
        return <PlayView jumpTo={jumpTo} />;
      case 'market':
        return <MarketView jumpTo={jumpTo} />;
      case 'wallet':
        return <WalletView jumpTo={jumpTo} />;
      case 'settings':
        return <SettingsView jumpTo={jumpTo} />;
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <TabView
            style={this.props.style}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
            tabBarPosition={'bottom'}
            animationEnabled={true}
            swipeEnabled={true}
            initialLayout={{ width: Dimensions.get('window').width }}
          />
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#FFFFFF',
  },
  tab: {
    padding: 0,
  },
  icon: {
    backgroundColor: 'transparent',
    height: 24,
    width: 24
  },
  label: {
    fontSize: 12,
    marginTop: 2,
    color: "#DADDE2",
    fontFamily: Fonts.regular
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  indicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0084ff',
    margin: 6,
  },
  badge: {
    marginTop: 0,
    marginRight: 20,
    backgroundColor: '#f44336',
    height: 18,
    width: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
  active: {
    color: primaryBlueColor,
  },
  inactive: {
    color: '#939393'
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4.5,
  },
  activeItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

export default BottomTabView;