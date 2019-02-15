import * as React from 'react';
import { 
  Animated, 
  View, 
  Text, 
  StyleSheet, 
  Image,
  SafeAreaView,
  BackHandler
} from 'react-native';
import { 
  TabView, 
  TabBar,
  type Route, 
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

type State = NavigationState<
  Route<{
    key: string,
    title: string,
    icon: string,
    color: string,
  }>
>;

class BottomTabView extends React.Component<*, State> {
  static title = 'Bottom bar with indicator';
  static appbarElevation = 4;

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
      { key: '0', title: 'Health', icon: 'heart', color: 'transparent' },
      { key: '1', title: 'Play', icon: 'play', color: 'transparent', image: 'img_play' },
      { key: '2', title: 'Market', icon: 'market', color: 'transparent' },
      { key: '3', title: 'Wallet', icon: 'wallet', color: 'transparent' },
      { key: '4', title: 'Settings', icon: 'settings', color: 'transparent' },
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

  _renderIcon = ({ route }) => {
    var icon = route.icon + "_disabled";
    var image = route.image + "_disabled";
    var color = "#3599fe";
    if (parseInt(route.key) === parseInt(this.state.index)) {
      icon = route.icon + "_enabled";
      image = route.image + "_enabled";
      color =  "#3599fe";    
    }
    return (<Icon 
      name={icon}
      size= {20}
      style={styles.icon}
      color= {color}
      image={image}
    />);
  };

  _renderLabel = props => ({ route, index }) => {
    var color = "#DADDE2";
    if (parseInt(route.key) === parseInt(this.state.index)) {
      color = primaryBlueColor;     
    }
    return (
      <Animated.Text style={[styles.label, { color }]}>
        {route.title}
      </Animated.Text>
    );
  };

  _renderBadge = ({ route }) => {
    // if (route.key === '3') {
    //   return (
    //     <View style={styles.badge}>
    //       <Text style={styles.count}>2</Text>
    //     </View>
    //   );
    // }
    return null;
  };

  _getLabelText = ({ route }) => route.title;

  _renderFooter = props => (
    <View style={styles.tabbar}>
      {props.navigationState.routes.map((route, index) => {
        return (
          <TouchableWithoutFeedback
            key={route.key}
            onPress={() => props.jumpTo(route.key)}
          >
            <Animated.View style={styles.tab}>
              {this._renderIcon(props)({ route, index })}
              {this._renderLabel(props)({ route, index })}
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );

  _renderTabBar = props => (
    <TabBar
      {...props}
      getLabelText={this._getLabelText}
      renderIcon={this._renderIcon}
      renderBadge={this._renderBadge}
      renderIndicator={this._renderIndicator}
      renderLabel={this._renderLabel(props)}
      scrollEnabled={false}
      tabStyle={styles.tab}
      style={styles.tabbar}
    />
  );

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '0':
        return (
          <HealthView
          />
        );
      case '1':
        return (
          <PlayView
           />
        );
      case '2':
        return (
          <MarketView
          />
        );
      case '3':
        return (
          <WalletView 
          />
        );
      case '4':
        return (
          <SettingsView 
          />
        );
      default:
        return null;
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
  },
});

export default BottomTabView;