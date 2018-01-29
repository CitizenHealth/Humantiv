import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from "./common";

class ProfileView extends Component {

  render() {
    return (
      <View style={{ flex: 1}}>
        <Text style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
          Profile View
        </Text>
        <Button style={{ height: "80"}}>
          Sign Out
        </Button>
      </View>
    );
  }
}


export default ProfileView;
