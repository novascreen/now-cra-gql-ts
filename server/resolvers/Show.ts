import _get from 'lodash/get';
import { getShowEpisodes, getShowSeasons } from '../tvmaze/api';
import { ShowResolvers } from '../types';

const Show: ShowResolvers = {
  airedYears: show => {
    const fromYear = _get((show.premiered || '').split('-'), [0], '');
    const previousEpisode = _get(show, '_embedded.previousepisode', null);
    let toYear = '';
    if (previousEpisode && show.status === 'Ended') {
      toYear = _get((previousEpisode.airdate || '').split('-'), [0], '');
    }
    return `${fromYear}–${toYear}`;
  },
  previousEpisode: show => _get(show, '_embedded.previousepisode', null),
  nextEpisode: show => _get(show, '_embedded.nextepisode', null),
  episodes: show => getShowEpisodes(show.id),
  seasons: show => getShowSeasons(show.id),
};

export default Show;
