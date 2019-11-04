import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Route } from 'react-router';

import { Show as ShowType } from 'graphql/types';
import Box from 'components/UI/Box';
import FavoriteToggle from 'components/Shows/FavoriteToggle';
import HTML from 'components/Util/HTML';
import EpisodeCard from 'components/Episodes/EpisodeCard';
import Info from 'components/Shows/Info';
import Seasons from 'components/Shows/Seasons';
import InlineDivider from 'components/UI/InlineDivider';
import appHistory from 'appHistory';

type Props = {
  show: ShowType;
  url: String;
  section: String;
};

export const ShowDetails = ({ url, show, section = '' }: Props) => {
  const episodes = [];
  if (show.nextEpisode) {
    episodes.push({
      episode: show.nextEpisode,
      title: 'Next Episode',
    });
  }
  if (show.previousEpisode) {
    episodes.push({
      episode: show.previousEpisode,
      title: 'Previous Episode',
    });
  }

  return (
    <>
      <Box mb={3} mt={3}>
        <Typography variant="h4">
          {show.name} {show.id && <FavoriteToggle showId={show.id} />}
        </Typography>
        <Box mb={1}>
          <Typography variant="caption">
            {show.airedYears} | {show.runtime} min
            <InlineDivider />
            {show.genres && show.genres.join(', ')}
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Box mb={4}>
        <Typography component="div">
          {show.image && show.image.medium && (
            <Box pr={2} style={{ float: 'left', maxWidth: '40%' }}>
              <img
                src={show.image.medium}
                style={{ maxWidth: '100%', height: 'auto' }}
                alt={`${show.name}`}
              />
            </Box>
          )}
          {show.summary && <HTML content={show.summary} />}
        </Typography>
      </Box>
      {episodes.length && (
        <Box mb={4}>
          <Grid container spacing={2}>
            {episodes.map(episode => (
              <Grid item xs={12} sm={6} key={episode.title}>
                <Paper style={{ height: '100%' }} elevation={2}>
                  <Box p={2}>
                    <EpisodeCard {...episode} show={show} />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Box mb={4}>
        <Box mb={3}>
          <Tabs
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            value={section}
            onChange={(e, value) =>
              appHistory.push(`/shows/${show.id}/${value}`, {
                noScroll: true,
              })
            }
          >
            <Tab value="" label={<>Info</>} />
            <Tab value="episodes" label={<>Episodes</>} />
          </Tabs>
          <Divider />
        </Box>

        <Route
          exact
          path={`/shows/${show.id}`}
          component={() => <Info show={show} />}
        />
        <Route
          exact
          path={`/shows/${show.id}/episodes`}
          component={() => <Seasons show={show} />}
        />
      </Box>
    </>
  );
};

export default ShowDetails;
