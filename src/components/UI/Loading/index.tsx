import React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loading: React.SFC<GridProps> = props => (
  <Grid container {...props}>
    <CircularProgress />
  </Grid>
);

Loading.defaultProps = {
  spacing: 2,
  justify: 'center',
};

export default Loading;
