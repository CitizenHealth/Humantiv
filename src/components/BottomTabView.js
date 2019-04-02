import * as React from 'react';
import { 
  Animated, 
  View, 
  Text, 
  StyleSheet, 
  Image,
  SafeAreaView,
  BackHandler,
  Dimensions
} from 'react-native';
import { 
  TabView, 
  TabBar,
  SceneMap, 
  type NavigationState
} from 'react-native-tab-view';
import PlayView from './PlayView';
import MarketView from './MarketView';
import HealthView from './HealthView';
import WalletView from './WalletView';
import SettingsView from './SettingsView';
import {primaryBlueColor} from './themes/theme';
import {
  Icon  
} from './common';

class BottomTabView extends React.Component<*, State> {
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
      { key: 'health', title: 'Health', icon: 'heart', color: 'transparent' },
      { key: 'play', title: 'Play', icon: 'img_play', color: 'transparent', image: 'img_play' },
      { key: 'market', title: 'Market', icon: 'market', color: 'transparent' },
      { key: 'wallet', title: 'Wallet', icon: 'wallet', color: 'transparent' },
      { key: 'settings', title: 'Settings', icon: 'settings', color: 'transparent' },
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

  _renderTabBar = props => (
    <TabBar
      {...props}
      getLabelText={this._getLabelText}
      renderIcon={this._renderIcon}
      renderBadge={this._renderBadge}
//      renderIndicator={this._renderIndicator(props)}
      renderLabel={this._renderLabel}
      scrollEnabled={false}
      tabStyle={styles.tab}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={styles.tabbar}
    />
  );

  _renderScene = SceneMap({
    health: HealthView,
    play: PlayView,
    market: MarketView,
    wallet: WalletView,
    settings: SettingsView,
  });

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <TabView
            lazy
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
    color: "#DADDE2"
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
  }
});

export default BottomTabView;