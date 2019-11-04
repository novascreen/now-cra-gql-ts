import _get from 'lodash/get';
import { EpisodeResolvers } from '../types';

const Episode: EpisodeResolvers = {
  show: episode => episode.show || _get(episode, '_embedded.show', null),
};

export default Episode;
