import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ProfileView extends Component {

  render() {
    return (
      <View>
        <Text style={{flex: 1, justifyContent: 'center'}}>
          Profile
        </Text>
      </View>
    );
  }
}

export default ProfileView;
