import React from "react";
import { View, Modal, Text } from "react-native";
import { Button } from "./Button";
import { CardSection } from "./CardSection";

const Confirm = ({children, visible, onAccept, onDecline}) => {
  const { cardSectionStyle, textStyle, containerStyle} = styles;
  return (
    <Modal
      style={containerStyle}
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={ () => {}}
    >
      <View>
        <CardSection style = {cardSectionStyle}>
          <Text style={textStyle}> {children} </Text>
        </CardSection>
        <CardSection>
          <Button onPress={onAccept}>
            Yes
          </Button>
          <Button onPress={onDecline}>
            No
          </Button>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: "center"
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    position: "relative",
    flex: 1,
    justifyContent: "center"
  }
};
export { Confirm };
