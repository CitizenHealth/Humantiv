'use strict';

import React, { Component } from 'react';
import { 
  Animated, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  View, 
  Text ,
  SafeAreaView
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import {scale} from 'react-native-size-matters';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import {
  medifluxMainColor, 
  medifluxWhiteColor,
  medifluxGreyColor
} from './Colors';
import Images from '../images/images';
import {DataSourceBoard} from '../components'

class MedifluxLink extends Component {
  
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onNativeSourceClick: PropTypes.func,
    onSourceClick: PropTypes.func
  };
  
  static defaultProps = {
    visible: false
  };

  constructor(props) {
    super(props);
  }

  renderModalContent() {
    const {
      onCantFindClick,
      onNativeSourceClick,
      onSourceClick
    } = this.props;

    var sources = [
      {
        title: 'Apple Watch',
        image: Images.img_applewatch,
        selected: false,
        onSelect: onNativeSourceClick
      },
      {
        title: 'Fitbit',
        image: Images.img_fitbit,
        selected: false,
        onSelect: onSourceClick
      },
      {
        title: 'Misfit',
        image: Images.img_misfit,
        selected: false,
        onSelect: onSourceClick
      },
      {
        title: 'Nokia (Withings)',
        image: Images.img_withings,
        selected: false,
        onSelect: onSourceClick
      },
      {
        title: 'Movable',
        image: Images.img_movable,
        selected: false,
        onSelect: onSourceClick
      },
      {
        title: 'Can\'t find it?',
        image: Images.img_cantfindit,
        selected: false,
        onSelect: onCantFindClick
      },
    ]
    return (
      <View 
        style= {{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: medifluxWhiteColor,
          shadowColor: medifluxGreyColor,
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 1
        }}
      >
        <View
          style= {{
            height: scale(44),
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-end'
          }}
        >
          <TouchableOpacity 
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 44,
              width: 44,
              marginLeft: 5,
              marginRight: 5
            }}
            onPress={() => {this.props.onClose()}}
          >
            <FontAwesome
              style={{
                fontSize: 30,
                color: medifluxMainColor
              }}
            >
              {Icons.timesCircle}
            </FontAwesome>
          </TouchableOpacity>
        </View>
        <View
          style= {{
            height: scale(30),
            alignContent: 'center',
            width: '100%'
          }}
        >
          <Text
            style={{
              flex: 4,
              textAlign: 'center',
              fontSize: 20,
              color: medifluxMainColor,
            }}
          >
            Link a data source
          </Text>
        </View>

        <View
          style= {{
            flex: 1,
            height: '100%',
            width: '100%'
          }}
        >
          <DataSourceBoard
            sources = {sources}
          />
        </View>
        <View
          style= {{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 20,
            width: '100%'
          }}
        >
        <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: medifluxGreyColor,
              marginRight: 5
            }}
          >
          Powered by 
        </Text>
        <Image
          style={{ 
            width: 14, 
            height: 12,
            marginRight: 1
          }} 
          source={Images.img_logo} 
        /> 
        <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: medifluxMainColor,
              marginRight: 5
            }}
          >
            Mediflux 
          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex:1
        }}
      >
        <Modal
          isVisible={this.props.visible}
          backdropOpacity={0}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={500}
          animationOutTiming={500}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
          style= {{
            paddingTop: scale(80),
            paddingBottom: scale(80), 
          }}
        >
      
          {this.renderModalContent()}
        </Modal>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  
});

export {MedifluxLink};