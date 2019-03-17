'use strict';

import React, { Component } from 'react';
import { Animated, Dimensions, Modal, Platform, TouchableWithoutFeedback, StyleSheet, View, SafeAreaView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PropTypes from 'prop-types';

const modalPropTypes = {
  animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
  presentationStyle: PropTypes.oneOf([
    'fullScreen',
    'pageSheet',
    'formSheet',
    'overFullScreen',
  ]),
  transparent: PropTypes.bool,
  hardwareAccelerated: PropTypes.bool,
  visible: PropTypes.bool,
  onRequestClose:
    Platform.isTV || Platform.OS === 'android'
      ? PropTypes.func.isRequired
      : PropTypes.func,
  onShow: PropTypes.func,
  onDismiss: PropTypes.func,
  supportedOrientations: PropTypes.arrayOf(
    PropTypes.oneOf([
      'portrait',
      'portrait-upside-down',
      'landscape',
      'landscape-left',
      'landscape-right',
    ]),
  ),
  onOrientationChange: PropTypes.func,
};

class ModalWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitState();
  }

  isVertical = () => {
    return this.props.position === 'top' || this.props.position === 'bottom';
  }

  getInitialPosition = () => {
    const { width, height } = Dimensions.get('window');
    const { position } = this.props;
    let initialPosition = this.isVertical() ? height : width;

    if (position === 'top' || position === 'left') {
      initialPosition = -initialPosition;
    }
    return initialPosition;
  }

  getInitState = () => {
    this.isClosingFromOverlayPress = false;
    return {
      currentPosition: new Animated.Value(this.getInitialPosition()),
      isAnimating: false,
      overlayOpacity: new Animated.Value(0)
    };
  }

  getOverlayOpacity = () => {
    const { overlayStyle: { opacity } = {} } = this.props;
    return opacity === 0 || opacity > 0 ? opacity : 0.5;
  }

  componentDidMount() {
    const { animateOnMount, onAnimateOpen, visible } = this.props;

    if (visible) {
      if (animateOnMount) {
        this.animateOpen();
      } else {
        this.setState({
          currentPosition: new Animated.Value(0),
          isAnimating: false,
          overlayOpacity: new Animated.Value(this.getOverlayOpacity())
        });
        onAnimateOpen();
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.visible !== this.props.visible) {
      if (newProps.visible) {
        this.animateOpen();
      } else {
        const { onAnimateClose, onRequestClose, shouldAnimateOnOverlayPress, shouldAnimateOnRequestClose } = newProps;
        const handleClose = (shouldAnimate) => {
          if (shouldAnimate) {
            this.animateClose();
          } else {
            this.setState(this.getInitState());
            onRequestClose();
            onAnimateClose();
          }
        };

        if (this.isClosingFromOverlayPress) {
          handleClose(shouldAnimateOnOverlayPress);
        } else {
          handleClose(shouldAnimateOnRequestClose);
        }
      }
    }
  }

  animateOpen = () => {
    const { animationDuration, onAnimateOpen } = this.props;

    Animated.timing(
      this.state.overlayOpacity, {
        toValue: this.getOverlayOpacity(),
        duration: animationDuration
      }
    ).start();
    Animated.timing(
      this.state.currentPosition, {
        toValue: 0,
        duration: animationDuration
      }
    ).start(() => {
      this.setState({ isAnimating: false });
      onAnimateOpen();
    });
    this.setState({ isAnimating: true });
  };

  animateClose = () => {
    const { animationDuration, onAnimateClose } = this.props;
    const initialPosition = this.getInitialPosition();

    Animated.timing(
      this.state.overlayOpacity, {
        toValue: 0,
        duration: animationDuration
      }
    ).start();
    Animated.timing(
      this.state.currentPosition, {
        toValue: initialPosition,
        duration: animationDuration
      }
    ).start(() => {
      this.isClosingFromOverlayPress = false;
      this.setState({ isAnimating: false });
      onAnimateClose();
    });
    this.setState({ isAnimating: true });
  };

  onOverlayPress = () => {
    if (this.state.isAnimating) {
      return;
    }
    const { onRequestClose, shouldCloseOnOverlayPress } = this.props;

    if (shouldCloseOnOverlayPress) {
      this.isClosingFromOverlayPress = true;
      onRequestClose();
    }
  }

  render() {
    const { visible, ...nativeModalProps } = Object.keys(modalPropTypes).reduce((previous, current) => {
      if (this.props.hasOwnProperty(current)) {
        previous[current] = this.props[current];
      }
      return previous;
    }, {});
    const { children, containerStyle, isNative, overlayStyle, overlayTestID, showOverlay, screenHeight, style,
          ...modalProps } = Object.keys(this.props).reduce((previous, current) => {
      // the reducer is used to get the correct set of ...modalProps
      if (!modalPropTypes.hasOwnProperty(current) && current !== 'position') {
        previous[current] = this.props[current];
      }
      return previous;
    }, {});
    const { currentPosition, isAnimating, overlayOpacity } = this.state;
    const isVisible = visible || isAnimating;
    const modalStyle = [
      styles.modal,
      style,
      { transform: this.isVertical() ? [{ translateY: currentPosition }] : [{ translateX: currentPosition }] }
    ];
    const modal = <Animated.View style={modalStyle} {...modalProps}>
      {children}
    </Animated.View>;
    const computedScreenHeight = screenHeight ? screenHeight : Dimensions.get('window').height;
    const keyboardSpacer = Platform.OS === 'ios' ? <KeyboardSpacer screenHeight={computedScreenHeight} /> : null;
    const renderContainer = isJs => ( // eslint-disable-line no-extra-parens
        <View style={[isJs && styles.overlayWrapper, styles.container, containerStyle]}>
          {showOverlay &&
            <TouchableWithoutFeedback style={styles.overlayWrapper} onPress={this.onOverlayPress} testID={overlayTestID}>
              <Animated.View style={[styles.overlay, overlayStyle, { opacity: overlayOpacity }]} />
            </TouchableWithoutFeedback>}
          {modal}
          {isJs && keyboardSpacer}
        </View>
    );
    const nativeModal = 
      <Modal
        visible={isVisible}
        {...nativeModalProps}>
          {renderContainer()}
          {keyboardSpacer}
      </Modal>;
    
    const jsModal = isVisible && (showOverlay ? renderContainer(true) : modal);

    return isNative ? nativeModal : jsModal;
  }
}

ModalWrapper.propTypes = {
  animateOnMount: PropTypes.bool,
  animationDuration: PropTypes.number,
  containerStyle: PropTypes.any,
  isNative: PropTypes.bool,
  onAnimateClose: PropTypes.func,
  onAnimateOpen: PropTypes.func,
  overlayStyle: PropTypes.any,
  overlayTestID: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  screenHeight: PropTypes.number,
  showOverlay: PropTypes.bool,
  shouldAnimateOnOverlayPress: PropTypes.bool,
  shouldAnimateOnRequestClose: PropTypes.bool,
  shouldCloseOnOverlayPress: PropTypes.bool,
  visible: PropTypes.bool.isRequired
};

ModalWrapper.defaultProps = {
  animateOnMount: false,
  animationDuration: 300,
  animationType: 'none',
  isNative: true,
  onAnimateClose: () => null,
  onAnimateOpen: () => null,
  onRequestClose: () => null,
  position: 'bottom',
  showOverlay: true,
  shouldAnimateOnOverlayPress: true,
  shouldAnimateOnRequestClose: false,
  shouldCloseOnOverlayPress: true,
  transparent: true
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  modal: {
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  overlay: {
    backgroundColor: '#000',
    position: 'absolute',
    top: -500,
    bottom: -500,
    left: -500,
    right: -500,
    opacity: 0
  },
  overlayWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

export {ModalWrapper};