import _get from 'lodash/get';
import { getSeasonEpisodes } from '../tvmaze/api';
import { SeasonResolvers } from '../types';

const Season: SeasonResolvers = {
  episodes: season => getSeasonEpisodes(season.id),
};

export default Season;
