import 'react-native';
import React from 'react';
import LoginForm from '../src/Components/LoginForm';
import renderer from 'react-test-renderer';

it('LoginForm component renders correctly if show is true', () => {
  const tree = renderer.create(<LoginForm />);
});
