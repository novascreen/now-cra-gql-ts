import * as R from 'ramda';
import { FavoriteShow } from './types';

type DFS = {
  mutate: any;
  userId: string;
  favoriteShow: FavoriteShow;
  favoriteShows: FavoriteShow[];
};

export default ({ mutate, userId, favoriteShow, favoriteShows }: DFS) => {
  const favoriteShowIndex = R.findIndex(
    R.propEq('id', favoriteShow.id),
    favoriteShows
  );
  return mutate({
    variables: { id: favoriteShow.id },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteFavoriteShow: {
        __typename: 'User',
        id: userId,
        favoriteShows: R.remove(favoriteShowIndex, 1, favoriteShows)
      }
    }
  });
};
