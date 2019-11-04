import React from 'react';
import MUIBottomNavigation from '@material-ui/core/BottomNavigation/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppBar from '@material-ui/core/AppBar/AppBar';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

import { NavigationItem } from './index';

type Props = WithStyles<typeof styles> & {
  items: NavigationItem[];
  value: string;
  onChange: (e: any, value: string) => void;
};

export const BottomNavigation: React.SFC<Props> = ({
  classes,
  items = [],
  value,
  onChange
}) => (
  <AppBar position="fixed" className={classes.root}>
    <MUIBottomNavigation value={value} onChange={onChange} showLabels>
      {items.map(({ label, Icon, ...item }: any) => (
        <BottomNavigationAction
          key={item.value}
          label={label}
          icon={<Icon />}
          value={item.value}
        />
      ))}
    </MUIBottomNavigation>
  </AppBar>
);

const styles = createStyles({
  root: {
    top: 'auto',
    bottom: 0
  }
});

export default withStyles(styles)(BottomNavigation);
