import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory/lib/inMemoryCache';
import toggle from 'lib/ramda/toggle';

export type Favorites = number[];

export type Defaults = {
  favorites: Favorites;
} | null;

export const GET_FAVORITES = gql`
  query GetFavorites {
    favorites @client
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($showId: Int!) {
    toggleFavorite(showId: $showId) @client
  }
`;

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  } catch (e) {
    return [];
  }
};

export default {
  defaults: {
    favorites: getFavorites(),
  },
  resolvers: {
    Mutation: {
      toggleFavorite(
        _: any,
        { showId }: { showId: number },
        { cache }: { cache: InMemoryCache },
      ): null {
        const state: Defaults = cache.readQuery({ query: GET_FAVORITES });
        if (!state) return null;
        
        const favorites = toggle(showId, state.favorites);
        try {
          localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (e) {
          console.error('Favorites could not be saved');
        }
        cache.writeData({
          data: {
            favorites,
          },
        });

        return null;
      },
    },
  },
};
