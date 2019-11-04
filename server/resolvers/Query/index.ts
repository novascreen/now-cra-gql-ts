import { isLoggedIn, Context } from '../../utils/utils';
import {
  getShowById,
  getEpisodeById,
  search,
  getShowEpisodes
} from '../../tvmaze/api';
import shows from './shows';
import scheduleAll from './scheduleAll';
import scheduleByDate from './scheduleByDate';
import scheduleFavorites from './scheduleFavorites';
import {
  QueryEpisodeArgs,
  QueryEpisodesArgs,
  QueryShowArgs,
  QuerySearchArgs,
  QueryResolvers
} from '../../types';

const Query: QueryResolvers = {
  me(parent, args, ctx): any {
    const { auth0id } = isLoggedIn(ctx);
    return ctx.db.user({ auth0id });
  },
  search(parent, { query }) {
    return search(query);
  },
  show(parent, { id }) {
    return getShowById(id);
  },
  shows,
  scheduleAll,
  scheduleByDate,
  scheduleFavorites,
  episode(parent, { id }) {
    return getEpisodeById(id);
  },
  episodes(parent, { showId }) {
    return getShowEpisodes(showId);
  }
};

export default Query;
