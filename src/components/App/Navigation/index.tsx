import React from 'react';
import Schedule from '@material-ui/icons/Schedule';
import LiveTv from '@material-ui/icons/LiveTv';
// import Star from '@material-ui/icons/Star';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { withRouter, RouteComponentProps } from 'react-router';

import TopNavigation from './TopNavigation';
import BottomNavigation from './BottomNavigation';

export type NavigationItem = {
  label: string;
  Icon: React.ReactType<SvgIconProps>;
  value: string;
  match: RegExp;
};

const items: NavigationItem[] = [
  {
    label: 'Countdown',
    Icon: Schedule,
    value: '/',
    match: /^\/$/
  },
  {
    label: 'Shows',
    Icon: LiveTv,
    value: '/shows',
    match: /^\/shows/
  }
];

type Props = RouteComponentProps<{}> & {
  position?: 'top' | 'bottom';
};

export class Navigation extends React.Component<Props> {
  handleChange = (e: any, value: string) => {
    this.props.history.push(value);
  };

  render() {
    const { position = 'top', location } = this.props;
    const Component: any =
      position === 'top' ? TopNavigation : BottomNavigation;
    const match = items.find(item => item.match.test(location.pathname));
    const value = match ? match.value : '';

    return (
      <Component
        {...{
          items,
          value,
          onChange: this.handleChange
        }}
      />
    );
  }
}

export default withRouter(Navigation);
