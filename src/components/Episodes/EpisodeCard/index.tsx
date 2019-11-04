import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedDate } from 'react-intl';
import Typography from '@material-ui/core/Typography';

import { Episode as EpisodeType, Show } from 'graphql/types';
import EpisodeNumber from 'components/Episodes/EpisodeNumber';
import HTML from 'components/Util/HTML';

type Props = {
  title: string;
  episode: EpisodeType;
  show: Show;
};

export const EpisodeCard = ({ title, episode, show }: Props) => (
  <>
    <Typography variant="h6">{title}</Typography>
    <Link to={`/shows/${show.id}/episodes/${episode.id}`}>
      <Typography variant="subtitle1">{episode.name}</Typography>
    </Link>
    <Typography variant="body2" component="h4">
      <EpisodeNumber episode={episode} />
      {episode.airstamp && (
        <>
          {' - '}
          <FormattedDate
            value={episode.airstamp}
            month="short"
            day="numeric"
            year="numeric"
          />
        </>
      )}
    </Typography>
    {episode.summary && (
      <Typography component="div">
        <HTML content={episode.summary} />
      </Typography>
    )}
  </>
);

export default EpisodeCard;
