import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './index';

it('renders without crashing at top', () => {
  shallow(<Navigation position="top" />);
});

it('renders without crashing at bottom', () => {
  shallow(<Navigation position="bottom" />);
});
