import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { LoginForm } from '../src/components';

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  );
});

test( 'Login view renders correctly', () => {
  const tree = renderer.create(
    <LoginForm />
  ).toJSON()

  expect( tree ).toMatchSnapshot();
} );

test( 'Login view renders with invalid login credentials', () => {
  const tree = renderer.create(
    <LoginForm
      error="The email and password you entered did not match our records. Please try again!"
    />
  ).toJSON()

  expect( tree ).toMatchSnapshot();
} );
