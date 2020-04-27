import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  UIManager,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {noop} from 'lodash';
import {AccessoryButton} from './AccessoryButton';
import {EmbeddedIcon} from './EmbeddedIcon';
import {TextEntryType} from '../../types';
import {primaryBlueColor} from '../themes';
import { ifElse} from '../../business';

const TEXTINPUT_SPACE_FLEX = 1;
const TEXTINPUT_CONTENT_FLEX = 4;
const TEXTINPUT_ENTRY_WIDTH = '100%';
const TEXTINPUT_SPACE = 10;
const TEXTINPUT_CONTAINER_HEIGHT = 120;
const TEXTINPUT_HEIGHT = 50;
const TEXTINPUT_ICON_MARGIN = 12;
const TEXTINPUT_ICON_SIZE = 20;
const TEXTINPUT_ERROR_MAXLINES = 2;

interface IProps {
  title: string;
  type?: TextEntryType;
  value?: string | null;
  width?: string | number;
  placeholder?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | undefined;
  enablesReturnKeyAutomatically?: boolean;
  accessoryDisabled?: boolean;
  accessoryIcon?: boolean;
  errorMessage?: string;
  secureTextEntry?: boolean;
  returnKeyType?:
    | 'none'
    | 'default'
    | 'next'
    | 'search'
    | 'done'
    | 'go'
    | 'send'
    | 'previous'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call'
    | undefined;
  testID?: string;
  onSubmitEditing?: (value: any) => void;
  onChangeText?: (value: any) => void;
  onFocus?: () => void;
  reference?: (value: any) => void;
}

const TextField: React.FC<IProps> = ({
  title = '',
  type = TextEntryType.Empty,
  value = '',
  width = TEXTINPUT_ENTRY_WIDTH,
  placeholder = '',
  autoCapitalize = 'none',
  keyboardType = 'default',
  enablesReturnKeyAutomatically = true,
  accessoryDisabled = false,
  accessoryIcon = false,
  errorMessage = '',
  secureTextEntry = false,
  returnKeyType = 'next',
  testID = '',
  onSubmitEditing = noop,
  onChangeText = noop,
  onFocus = noop,
  reference = noop,
}) => {
  const [focus, setFocus] = useState(false);
  const [secureText, setSecureText] = useState(secureTextEntry);
  const [error, setError] = useState(errorMessage);

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const renderPlaceHolder = <View style={styles.placeholder} />;

  const renderAccessoryIcon = (accessoryIcon: boolean) => {
    const color = focus ? primaryBlueColor : primaryBlueColor;

    return accessoryIcon ? (
      <AccessoryButton
        height={TEXTINPUT_ICON_SIZE}
        width={TEXTINPUT_ICON_SIZE}
        disabled={accessoryDisabled}
        onPress={() => {
          setSecureText(!secureText);
        }}>
        {secureText ? (
          <Icon name="md-eye" size={TEXTINPUT_ICON_SIZE} color={color} />
        ) : (
          <Icon name="md-eye-off" size={TEXTINPUT_ICON_SIZE} color={color} />
        )}
      </AccessoryButton>
    ) : (
      renderPlaceHolder
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          width,
        },
      ]}>
      <View style={styles.titleContainer}>
        <View style={{flex: TEXTINPUT_SPACE_FLEX}} />
        <Text
          style={styles.title}
          numberOfLines={2}
          adjustsFontSizeToFit={true}>
          {title}
        </Text>
        <View style={{flex: TEXTINPUT_SPACE_FLEX}} />
      </View>
      <View
        style={[
          styles.textInputContainer,
          {
            borderColor: error ? primaryBlueColor : '#b0a7b4',
            backgroundColor: focus
              ? '#FFFFFF'
              : '#FFFFFF'
          },
        ]}>
        <View style={styles.iconsContainer}>
          <EmbeddedIcon type={type} focus size={TEXTINPUT_ICON_SIZE} />
        </View>
        <TextInput
          ref={reference}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={'#b0a7b4'}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          secureTextEntry={secureText}
          autoCorrect={false}
          value={value || ''}
          enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
          returnKeyType={returnKeyType}
          testID={testID}
          onChangeText={onChangeText}
          onBlur={() => {
            setFocus(false);
          }}
          onFocus={() => {
            setFocus(true);
            setError('');
            onFocus();
          }}
          onSubmitEditing={onSubmitEditing}
        />
        <View style={styles.iconsContainer}>
          {renderAccessoryIcon(accessoryIcon)}
        </View>
      </View>
      {error ? (
        <View
          style={[
            styles.errorContainer,
            {
              width,
            },
          ]}>
          <Text
            style={styles.errorText}
            numberOfLines={TEXTINPUT_ERROR_MAXLINES}>
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: TEXTINPUT_CONTAINER_HEIGHT,
    width: TEXTINPUT_CONTAINER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    flex: TEXTINPUT_CONTENT_FLEX,
    textAlign: 'center',
    color: '#777777',
  },
  icon: {
    width: TEXTINPUT_ICON_SIZE,
    height: TEXTINPUT_ICON_SIZE,
    marginLeft: TEXTINPUT_ICON_MARGIN,
    marginRight: TEXTINPUT_ICON_MARGIN,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: TEXTINPUT_ENTRY_WIDTH,
    height: TEXTINPUT_HEIGHT,
    borderRadius: 5,
    // shadowColor: TEXTINPUT_SHADOW_COLOR,
    // shadowOffset: TEXTINPUT_SHADOW_OFFSET,
    // shadowRadius: TEXTINPUT_SHADOW_RADIUS,
    // shadowOpacity: TEXTINPUT_SHADOW_OPACITY,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginTop: TEXTINPUT_SPACE,
  },
  textInput: {
    flex: 1,
    textAlign: 'center',
    color: '#777777',
  },
  placeholder: {
    width: TEXTINPUT_ICON_SIZE,
    height: TEXTINPUT_ICON_SIZE,
  },
  iconsContainer: {
    marginLeft: TEXTINPUT_ICON_MARGIN,
    marginRight: TEXTINPUT_ICON_MARGIN,
  },
  errorContainer: {
    width: TEXTINPUT_CONTAINER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5,
    // shadowColor: TEXTINPUT_SHADOW_COLOR,
    // shadowOffset: TEXTINPUT_SHADOW_OFFSET,
    // shadowRadius: TEXTINPUT_SHADOW_RADIUS,
    // shadowOpacity: TEXTINPUT_SHADOW_OPACITY,
    backgroundColor: '#ffeded',
  },
  errorPlaceholder: {
    width: TEXTINPUT_CONTAINER_HEIGHT,
  },
  errorText: {
    color: '#e84147',
    textAlign: 'center',
    marginTop: TEXTINPUT_SPACE / 2,
    marginBottom: TEXTINPUT_SPACE / 2,
  },
});

export {TextField};
