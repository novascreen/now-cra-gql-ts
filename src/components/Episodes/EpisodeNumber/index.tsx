import React from 'react';
import { Episode } from 'graphql/types';
import getEpisodeNumber from 'lib/getEpisodeNumber';

type Props = {
  episode: Episode;
};

export const EpisodeNumber = ({ episode }: Props) => {
  const episodeNumber = getEpisodeNumber(
    episode.season || 0,
    episode.number || 0,
  );

  return <>{episodeNumber}</>;
};

export default EpisodeNumber;
