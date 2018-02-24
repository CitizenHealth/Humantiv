import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button } from '../../src/components/common';
import { SignUpButton, FacebookLoginButton, GoogleLoginButton } from '../../src/components/custom';
import CenterView from './CenterView';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .add('to Humantiv', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Base', () => (
    <Button 
      onPress={action('clicked-signin')}
      style={{
        marginLeft:20,
        marginRight: 20
      }}
    >
      <Text>Button</Text>
    </Button>
  )).add('Sign In', () => (
    <SignUpButton 
      onPress={action('clicked-signin')}
      style={{
        marginLeft:20,
        marginRight: 20
      }}
    >
      <Text>Sign In</Text>
    </SignUpButton>
  ))
  .add('Connect with Facebook', () => (
    <FacebookLoginButton 
      onPress={action('clicked-login-facebook')}
      style={{
        marginLeft:20,
        marginRight: 20
      }}
      login='facebook'
    >
      <Text>Connect with Facebook</Text>
    </FacebookLoginButton>
  ))
  .add('Connect with Google', () => (
    <GoogleLoginButton 
      onPress={action('clicked-login-google')}
      style={{
        marginLeft:20,
        marginRight: 20
      }}
      login='google'
    >
      <Text>Connect with Google</Text>
    </GoogleLoginButton>
  ))
