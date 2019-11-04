import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';
import { ApolloError } from 'apollo-client';

import { GET_FAVORITES, Favorites } from 'resolvers/favorites';
import { isAuthenticated } from 'lib/Auth';
import fragments from './fragments';
import { User, FavoriteShow } from './types';

interface Data {
  me: User;
}

interface Variables {}

const GET_MY_FAVORITE_SHOWS = gql`
  query GetMyFavoriteShows {
    me {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

interface FavoritesData {
  favorites: Favorites;
}

interface FavoritesVariables {}

export type Result = {
  loading: boolean;
  error: ApolloError | undefined;
  favoriteShows: FavoriteShow[];
  favoriteShowsIds: number[];
  userId: string | undefined;
};
type Props = {
  children: (result: Result) => JSX.Element | null;
};

export const useFavoritesQuery = () => {
  const auth = isAuthenticated();

  const favoritesResult = useQuery<FavoritesData, FavoritesVariables>(
    GET_FAVORITES
  );
  const meResult = useQuery<Data, Variables>(GET_MY_FAVORITE_SHOWS, {
    skip: !auth
  });

  let favoriteShows: FavoriteShow[] = [];
  let userId;

  // Return locally stored favorites
  if (favoritesResult.data && favoritesResult.data.favorites) {
    favoriteShows = favoritesResult.data.favorites.map(favorite => ({
      id: uuid(),
      tvmaze: favorite
    }));
  }

  // Return favorites from profile if authenticated
  if (auth && meResult.data && meResult.data.me) {
    userId = meResult.data.me.id;
    favoriteShows = meResult.data.me.favoriteShows;
  }

  const favoriteShowsIds = favoriteShows.map(favorite => favorite.tvmaze);

  return {
    loading: (auth && meResult.loading) || favoritesResult.loading,
    error: meResult.error || favoritesResult.error,
    favoriteShows,
    favoriteShowsIds,
    userId
  };
};

export default ({ children = () => null }: Props) => {
  const props = useFavoritesQuery();

  return children(props);
};
