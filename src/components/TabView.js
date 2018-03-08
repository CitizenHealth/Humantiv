import * as React from 'react';
import { Animated, View, Text, StyleSheet, Image } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import SimplePage from './SimplePage';
import HomeView from './HomeView';
import HumanAPI from './HumanAPI';
import Images from '../resources/images';
import type { Route, NavigationState } from 'react-native-tab-view/types';

type State = NavigationState<
  Route<{
    key: string,
    title: string,
    icon: string,
    color: string,
  }>
>;

class TabView extends React.Component<*, State> {
  static title = 'Bottom bar with indicator';
  static appbarElevation = 4;

  componentWillMount() {
    var i = 2;
  }

  componentWillUnmount() {

  }
  
  state = {
    index: 0,
    routes: [
      { key: '0', title: 'Home', icon: 'img_home', color: 'transparent' },
      {
        key: '1',
        title: 'Vote',
        icon: 'img_vote',
        color: 'transparent',
      },
      { key: '2', title: 'Share', icon: 'img_share', color: 'transparent' },
      { key: '3', title: 'Purchase', icon: 'img_purchase', color: 'transparent' },
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
    var image = route.icon + "_disabled";
    if (parseInt(route.key) === parseInt(this.state.index)) {
      image = route.icon + "_enabled";     
    }
    const path = Images[image];
    return (<Image source={path} size={24} style={styles.icon} />);
  };

  _renderLabel = props => ({ route, index }) => {
    var color = "#DADDE2";
    if (parseInt(route.key) === parseInt(this.state.index)) {
      color = "#3C9AFB";     
    }
    return (
      <Animated.Text style={[styles.label, { color }]}>
        {route.title}
      </Animated.Text>
    );
  };

  _renderBadge = ({ route }) => {
    if (route.key === '1') {
      return (
        <View style={styles.badge}>
          <Text style={styles.count}>2</Text>
        </View>
      );
    }
    return null;
  };

  _getLabelText = ({ route }) => route.title;

  _renderFooter = props => (
    <TabBar
      {...props}
      getLabelText={this._getLabelText}
      renderIcon={this._renderIcon}
      renderBadge={this._renderBadge}
      renderIndicator={this._renderIndicator}
      renderLabel={this._renderLabel(props)}
      tabStyle={styles.tab}
      style={styles.tabbar}
    />
  );

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '0':
        return (
          <HumanAPI
          />
        );
      case '1':
        return (
          <SimplePage state={this.state} style={{ backgroundColor: route.color }} />
        );
      case '2':
        return (
          <SimplePage state={this.state} style={{ backgroundColor: route.color }} />
        );
      case '3':
        return (
          <SimplePage state={this.state} style={{ backgroundColor: route.color }} />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={this.props.style}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onIndexChange={this._handleIndexChange}
      />
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
    height: 24,
    width: 24,
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

export default TabView;