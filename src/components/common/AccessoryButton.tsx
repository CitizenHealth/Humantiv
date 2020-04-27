import React from 'react';
import {TouchableOpacity} from 'react-native';

const TEXTINPUT_ICON_SIZE = 20;

interface IProps {
  children?: JSX.Element;
  height?: number;
  width?: number;
  disabled?: boolean;
  onPress: () => void;
}

const AccessoryButton: React.FC<IProps> = ({
  children,
  height = TEXTINPUT_ICON_SIZE,
  width = TEXTINPUT_ICON_SIZE,
  disabled = false,
  onPress,
}) => (
  <TouchableOpacity
    style={{
      height,
      width,
    }}
    onPress={onPress}
    disabled={disabled}>
    {children}
  </TouchableOpacity>
);

export { AccessoryButton };
