import React from 'react';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

import ToggleMutation from './ToggleMutation';
import FavoritesQuery from 'graphql/FavoritesQuery';

type Props = {
  showId: number;
};

export const FavoriteToggle: React.SFC<Props> = ({ showId }) => {
  return (
    <FavoritesQuery>
      {({ userId, favoriteShows }) => {
        const favoriteShow = favoriteShows.find(show => show.tvmaze === showId);
        return (
          <ToggleMutation
            userId={userId}
            showId={showId}
            favoriteShow={favoriteShow}
            favoriteShows={favoriteShows}
          >
            {({ onToggle, loading }) => {
              return (
                <IconButton
                  onClick={onToggle}
                  color="primary"
                  disabled={loading}
                >
                  {favoriteShow ? <Star /> : <StarBorder />}
                </IconButton>
              );
            }}
          </ToggleMutation>
        );
      }}
    </FavoritesQuery>
  );
};

export default FavoriteToggle;
