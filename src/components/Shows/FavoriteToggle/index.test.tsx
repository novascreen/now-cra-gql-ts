import React from 'react';
import { shallow } from 'enzyme';
import { FavoriteToggle } from './index';

it('renders without crashing', () => {
  shallow(<FavoriteToggle showId={123} />);
});
