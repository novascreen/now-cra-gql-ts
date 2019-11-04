import React from 'react';
import { shallow } from 'enzyme';
import { AppBar } from './index';

it('renders without crashing', () => {
  shallow(<AppBar classes={{ root: '', flex: '', spacer: '' }} width="xs" />);
});
