import React from 'react';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import { TOGGLE_FAVORITE } from 'resolvers/favorites';
import { FavoriteShow } from 'graphql/types';
import fragments from 'graphql/fragments';
import { adoptMutation } from 'graphql/adopt';
import deleteFavoriteShow from 'graphql/deleteFavoriteShow';
import createFavoriteShow from 'graphql/createFavoriteShow';

const CREATE_FAVORITE_SHOW = gql`
  mutation CreateFavoriteShow($tvmaze: Int!) {
    createFavoriteShow(tvmaze: $tvmaze) {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

const DELETE_FAVORITE_SHOW = gql`
  mutation DeleteFavoriteShow($id: ID!) {
    deleteFavoriteShow(id: $id) {
      ...MyFavoriteShows
    }
  }
  ${fragments.myFavoriteShows}
`;

type RenderProps = {
  loading: boolean;
  onToggle: (e: React.MouseEvent<HTMLElement>) => void;
};

type Props = {
  userId?: string;
  showId?: number;
  favoriteShow?: FavoriteShow;
  favoriteShows?: FavoriteShow[];
  children: (props: RenderProps) => React.ReactNode;
};

type ComposedRenderProps = {
  toggleLocal: any;
  createFav: any;
  deleteFav: any;
  loading: boolean;
};

const Composed = adopt<ComposedRenderProps>(
  {
    toggleLocal: adoptMutation({ mutation: TOGGLE_FAVORITE }),
    createFav: adoptMutation({ mutation: CREATE_FAVORITE_SHOW }),
    deleteFav: adoptMutation({ mutation: DELETE_FAVORITE_SHOW }),
  },
  (props: ComposedRenderProps) => ({
    ...props,
    loading:
      props.toggleLocal.result.loading ||
      props.createFav.result.loading ||
      props.deleteFav.result.loading,
  }),
);

const ToggleMutation: React.SFC<Props> = ({
  userId,
  showId,
  favoriteShow,
  favoriteShows,
  children,
}) => (
  <Composed
    render={({ toggleLocal, createFav, deleteFav, loading }: any) =>
      children({
        loading,
        onToggle: (e: any) => {
          e.stopPropagation();

          if (loading || !favoriteShows || !showId) return;

          if (userId) {
            if (favoriteShow) {
              deleteFavoriteShow({
                mutate: deleteFav.run,
                userId,
                favoriteShow,
                favoriteShows,
              });
              return;
            }
            createFavoriteShow({
              mutate: createFav.run,
              userId,
              showId,
              favoriteShows,
            });
            return;
          }

          toggleLocal.run({ variables: { showId } });
        },
      })
    }
  />
);

export default ToggleMutation;
