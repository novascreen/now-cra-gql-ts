import { isLoggedIn, Context } from '../../utils/utils';
import {
  MutationCreateFavoriteShowArgs,
  MutationDeleteFavoriteShowArgs
} from '../../types';

export default {
  createFavoriteShow: async (
    parent: any,
    { tvmaze }: MutationCreateFavoriteShowArgs,
    ctx: Context,
    info: any
  ) => {
    const { id } = isLoggedIn(ctx);
    return ctx.db.updateUser({
      where: { id },
      data: { favoriteShows: { create: [{ tvmaze }] } }
    });
  },
  deleteFavoriteShow: async (
    parent: any,
    args: MutationDeleteFavoriteShowArgs,
    ctx: Context,
    info: any
  ) => {
    const { id } = isLoggedIn(ctx);
    return ctx.db.updateUser({
      where: { id },
      data: { favoriteShows: { delete: [{ id: args.id }] } }
    });
  }
};
