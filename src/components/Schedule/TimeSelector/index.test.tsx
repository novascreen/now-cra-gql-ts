import React from 'react';
import { shallow } from 'enzyme';
import TimeSelector from './index';

it('renders without crashing', () => {
  shallow(<TimeSelector value="upcoming" />);
});
