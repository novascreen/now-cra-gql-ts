import { getShowById } from '../../tvmaze/api';
import { combineResults } from '../../utils/utils';
import { QueryShowsArgs } from '../../types';

export default function(parent: any, { ids }: QueryShowsArgs) {
  return Promise.all(
    ids.map(async showId => {
      if (!showId) return [];
      let show;
      try {
        show = await getShowById(showId);
        if (show) return [show];
      } catch (e) {
        throw e;
      }
      return [];
    })
  ).then(combineResults);
}
