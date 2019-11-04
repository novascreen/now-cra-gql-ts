import gql from 'graphql-tag';

export default {
  myFavoriteShows: gql`
    fragment MyFavoriteShows on User {
      id
      favoriteShows {
        id
        tvmaze
      }
    }
  `,
};
