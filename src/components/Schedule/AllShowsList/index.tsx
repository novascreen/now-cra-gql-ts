import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import { Episode } from 'graphql/types';
import Loading from 'components/UI/Loading';
import EpisodesList from 'components/Episodes/List';
import Typography from '@material-ui/core/Typography';

interface Data {
  scheduleAll: Episode[];
}

interface Variables {
  previous?: boolean;
}

const GET_EPISODES = gql`
  query GetEpisodes($previous: Boolean!) {
    scheduleAll(previous: $previous) {
      id
      name
      season
      number
      airstamp
      show {
        id
        name
        image {
          medium
        }
      }
    }
  }
`;

type Props = {} & Variables;

export const AllShowsList: React.SFC<Props> = ({ previous }) => {
  const { loading, data } = useQuery<Data, Variables>(GET_EPISODES, {
    variables: { previous }
  });
  if (loading) return <Loading />;
  if (!data || !data.scheduleAll) {
    return <Typography>Episodes not found</Typography>;
  }
  return <EpisodesList episodes={data.scheduleAll} />;
};

export default AllShowsList;
