import React from 'react';

import FavoritesQuery from 'graphql/FavoritesQuery';
import FavoritesList from 'components/Schedule/FavoritesList';
import Loading from 'components/UI/Loading';

type Props = {
  previous?: boolean;
};

export const FavoritesSchedule: React.SFC<Props> = ({ previous }) => (
  <FavoritesQuery>
    {({ loading, favoriteShowsIds }) => {
      if (loading) return <Loading />;
      return <FavoritesList showIds={favoriteShowsIds} previous={previous} />;
    }}
  </FavoritesQuery>
);

export default FavoritesSchedule;
