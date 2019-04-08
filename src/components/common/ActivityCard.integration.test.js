import React from 'react';
import {ActivityCard} from './ActivityCard';

import renderer from 'react-test-renderer';

test('ActivityCard renders correctly', () => {
	const tree = renderer.create(<ActivityCard />).toJSON();
  expect(tree).toMatchSnapshot();
});


