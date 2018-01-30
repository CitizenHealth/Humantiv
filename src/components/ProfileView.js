import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from "./common";
import {connect} from "react-redux";
import { logoutUser } from "../actions";

class ProfileView extends Component {

  onLogOutButtonPress() {
    this.props.logoutUser();
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <Text style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
          Profile View
        </Text>
        <Button style={{ height: "80"}}
          onPress={this.onLogOutButtonPress.bind(this)}
        >
          Sign Out
        </Button>
      </View>
    );
  }
}

// const mapStateToProps = (state) => {
//   const {user} = state.auth;
//   return {user};
// };

export default connect(null, {logoutUser})(ProfileView);
