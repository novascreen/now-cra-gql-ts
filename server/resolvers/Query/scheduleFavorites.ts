import _get from 'lodash/get';
import _sortBy from 'lodash/sortBy';
import _reverse from 'lodash/reverse';
import {
  getShowById,
  getEpisodeById,
  getScheduleByDate,
  search
} from '../../tvmaze/api';
import { combineResults } from '../../utils/utils';
import { QueryScheduleFavoritesArgs } from '../../types';

const sortByDate = (results: any[]) => _sortBy(results, 'airstamp');

export default function scheduleFavorites(
  parent: any,
  { showIds, previous = false }: QueryScheduleFavoritesArgs
) {
  return Promise.all(
    showIds.map(async showId => {
      if (!showId) return [];
      let show;
      try {
        show = await getShowById(showId);
      } catch (e) {
        throw e;
      }
      const episode = previous
        ? _get(show, '_embedded.previousepisode', null)
        : _get(show, '_embedded.nextepisode', null);

      if (!episode) return [];

      episode.show = show;
      return [episode];
    })
  )
    .then(combineResults)
    .then(sortByDate)
    .then(results => (previous ? _reverse(results) : results));
}
