import { configure } from '@storybook/react';

function loadStories() {
  require('../storybook/stories/Button/index');
  // You can require as many stories as you need.
}

configure(loadStories, module);