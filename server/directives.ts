import { isLoggedIn, Context } from './utils/utils';
import { AuthenticationError } from 'apollo-server-core';
import { IDirectiveResolvers, Maybe } from 'types';

const isRequestingUserAlsoOwner = ({
  ctx,
  userId,
  type,
  typeId
}: {
  ctx: Context;
  userId?: string;
  type?: Maybe<string>;
  typeId?: string;
}) => {
  if (!type) return false;
  if (type !== 'user' && type !== 'favoriteShow') return false;
  return ctx.db.$exists[type]({ id: typeId, user: { id: userId } });
};

const directiveResolvers: IDirectiveResolvers<Context> = {
  isAuthenticated: (next, source, args, ctx) => {
    isLoggedIn(ctx);
    return next();
  },
  isOwner: async (next, source, { type }, ctx, info) => {
    const { id: typeId } = info.variableValues;
    const { id: userId } = isLoggedIn(ctx);
    const isOwner = await isRequestingUserAlsoOwner({
      ctx,
      userId,
      type,
      typeId
    });
    if (isOwner) {
      return next();
    }
    throw new AuthenticationError(`Unauthorized, must be owner`);
  }
};

export default directiveResolvers;
