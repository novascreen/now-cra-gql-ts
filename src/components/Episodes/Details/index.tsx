import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Episode } from 'graphql/types';
import Box from 'components/UI/Box';
import HTML from 'components/Util/HTML';
import InlineDivider from 'components/UI/InlineDivider';

type Props = {
  episode: Episode;
};

export const EpisodeDetails = ({ episode }: Props) => {
  const genres = (episode.show && episode.show.genres) || [];

  const hasAired = moment(episode.airstamp || undefined).isBefore();
  return (
    <>
      <Box mb={3} mt={3}>
        {episode.show && (
          <Link to={`/shows/${episode.show.id}`}>
            <Typography variant="subtitle1">
              {episode.show.name} ({episode.show.airedYears})
            </Typography>
          </Link>
        )}
        <Typography variant="h4">{episode.name}</Typography>
        <Box mb={1}>
          <Typography variant="caption">
            {episode.runtime} min
            <InlineDivider />
            {Boolean(genres.length) && (
              <>
                {genres.join(', ')}
                <InlineDivider />
              </>
            )}
            {hasAired ? 'Episode aired' : 'Episode airs'}{' '}
            {episode.airstamp && (
              <FormattedDate
                value={episode.airstamp}
                month="long"
                day="numeric"
                year="numeric"
              />
            )}
          </Typography>
        </Box>
        <Divider />
      </Box>
      <Box mb={4}>
        <Typography component="div">
          {episode.image && episode.image.medium && (
            <Box pr={2} style={{ float: 'left', maxWidth: '40%' }}>
              <img
                src={episode.image.medium}
                style={{ maxWidth: '100%', height: 'auto' }}
                alt={`${episode.name}`}
              />
            </Box>
          )}
          {episode.summary && <HTML content={episode.summary} />}
        </Typography>
      </Box>
    </>
  );
};

export default EpisodeDetails;
