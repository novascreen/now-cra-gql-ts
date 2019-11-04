import { FavoriteShow } from './types';

type CFS = {
  mutate: any;
  userId: string;
  showId: number;
  favoriteShows: FavoriteShow[];
};

export default ({ mutate, userId, showId, favoriteShows }: CFS) =>
  mutate({
    variables: { tvmaze: showId },
    optimisticResponse: {
      __typename: 'Mutation',
      createFavoriteShow: {
        __typename: 'User',
        id: userId,
        favoriteShows: [
          ...favoriteShows,
          { __typename: 'FavoriteShow', id: -1, tvmaze: showId },
        ],
      },
    },
  });
