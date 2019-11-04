import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { Typography } from '@material-ui/core';
import * as R from 'ramda';
import Loading from 'components/UI/Loading';
import List from 'components/Episodes/List';
import { Episode, Show } from 'graphql/types';
import Box from 'components/UI/Box';

interface Data {
  episodes: Episode[];
}

interface Variables {
  showId?: number | null;
}

const EPISODES = gql`
  query Episodes($showId: Int!) {
    episodes(showId: $showId) {
      id
      name
      season
      number
      airstamp
    }
  }
`;

type Props = {
  show: Show;
} & Variables;

const byDate = R.descend(R.prop<string>('airstamp'));

export const Seasons = ({ show }: Props) => {
  const { loading, data } = useQuery<Data, Variables>(EPISODES, {
    variables: { showId: show.id }
  });
  if (loading) return <Loading />;
  if (!data || !data.episodes || !data.episodes.length) {
    return <Typography>No episodes found</Typography>;
  }
  data.episodes.forEach(episode => (episode.show = show));
  const allEpisodes: Episode[] = R.sort(byDate, data.episodes);
  const seasons = R.groupBy(episode => `${episode.season}`, allEpisodes);
  return (
    <>
      {Object.entries(seasons)
        .reverse()
        .map(([season, episodes]) => (
          <Box mb={2} key={season}>
            <Box mb={1}>
              <Typography variant="h6" gutterBottom>
                Season {season}
              </Typography>
            </Box>
            <List show={show} episodes={episodes} disableInfinite />
          </Box>
        ))}
    </>
  );
};

export default Seasons;
