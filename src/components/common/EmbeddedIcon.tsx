import React from 'react';
import {View, StyleSheet} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {TextEntryType} from '../../types';
import {primaryBlueColor} from '../themes'

const TEXTINPUT_ICON_SIZE = 20;

interface IProps {
  type: TextEntryType;
  focus?: boolean;
  size?: number;
  color?: string;
  focusColor?: string;
}
const EmbeddedIcon: React.FC<IProps> = ({
  type,
  focus = false,
  size = TEXTINPUT_ICON_SIZE,
  color = primaryBlueColor,
  focusColor = primaryBlueColor,
}) => {
  const renderIcon = () => {
    const fill = focus ? focusColor : color;

    switch (type) {
      case TextEntryType.Name: {
        return <FeatherIcon name="user" size={size} color={fill} />;
      }
      case TextEntryType.Email: {
        return <FeatherIcon name="mail" size={size} color={fill} />;
      }
      case TextEntryType.Hospital: {
        return <FontAwesomeIcon name="hospital-o" size={size} color={fill} />;
      }
      case TextEntryType.Password: {
        return <SimpleLineIcon name="lock" size={size} color={fill} />;
      }
      default: {
        return <View style={styles.placeholder} />;
      }
    }
  };

  return <>{renderIcon()}</>;
};

const styles = StyleSheet.create({
  placeholder: {
    width: TEXTINPUT_ICON_SIZE,
    height: TEXTINPUT_ICON_SIZE,
  },
});

export { EmbeddedIcon};
