import { Context } from '../utils/utils';
import { User } from '../generated/prisma-client';
import { UserResolvers } from '../types';

const User: UserResolvers = {
  favoriteShows: (parent, args, ctx) =>
    ctx.db.user({ id: parent.id }).favoriteShows()
};

export default User;
