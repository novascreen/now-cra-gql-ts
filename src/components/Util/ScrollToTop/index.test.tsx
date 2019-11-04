import React from 'react';
import { shallow } from 'enzyme';
import ScrollToTop from './index';

it('renders without crashing', () => {
  shallow(<ScrollToTop />);
});
