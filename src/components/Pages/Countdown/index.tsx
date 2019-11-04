import React from 'react';
import { RouteComponentProps } from 'react-router';
import qs from 'query-string';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LiveTv from '@material-ui/icons/LiveTv';
import Star from '@material-ui/icons/Star';
import Box from 'components/UI/Box';
import AllShowsSchedule from 'components/Schedule/AllShowsSchedule';
import FavoritesSchedule from 'components/Schedule/FavoritesSchedule';
import TimeSelector from 'components/Schedule/TimeSelector';
import Divider from '@material-ui/core/Divider';

export class CountdownPage extends React.Component<RouteComponentProps<{}>> {
  get query() {
    return {
      shows: 'all',
      time: 'upcoming',
      ...qs.parse(this.props.location.search),
    };
  }

  handleShowsChange = (e: any, value: string) => {
    const { history } = this.props;
    history.push(`/?shows=${value}`);
  };

  handleTimeChange = (e: any) => {
    const { history } = this.props;
    history.push(`/?shows=${this.query.shows}&time=${e.target.value}`);
  };

  render() {
    const { shows, time } = this.query;
    const previous = time === 'previous';

    return (
      <>
        <Box mb={2}>
          <AppBar position="static" color="inherit" elevation={0} square>
            <Toolbar
              disableGutters
              style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
            >
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={shows}
                onChange={this.handleShowsChange}
                variant="scrollable"
              >
                <Tab label="All shows" icon={<LiveTv />} value="all" />
                <Tab label="Favorite shows" icon={<Star />} value="favorites" />
              </Tabs>
              <Box my={2}>
                <TimeSelector value={time} onChange={this.handleTimeChange} />
              </Box>
            </Toolbar>
          </AppBar>
          <Divider />
        </Box>
        <Box mb={2}>
          {shows === 'all' && <AllShowsSchedule previous={previous} />}
          {shows === 'favorites' && <FavoritesSchedule previous={previous} />}
        </Box>
      </>
    );
  }
}

export default CountdownPage;
