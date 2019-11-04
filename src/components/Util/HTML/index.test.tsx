import React from 'react';
import { shallow } from 'enzyme';
import HTML from './index';

it('renders without crashing', () => {
  shallow(<HTML content="<p>Test</p>" />);
});
