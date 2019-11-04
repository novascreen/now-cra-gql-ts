import { Context } from '../../utils/utils';
import validateAndParseIdToken from '../../utils/validateAndParseIdToken';
import { MutationAuthenticateArgs } from '../../types';

async function createPrismaUser(ctx: Context, idToken: any) {
  const user = await ctx.db.createUser({
    identity: idToken.sub.split(`|`)[0],
    auth0id: idToken.sub.split(`|`)[1],
    name: idToken.name,
    email: idToken.email,
    avatar: idToken.picture
  });
  return user;
}

export default {
  async authenticate(
    parent: any,
    { idToken }: MutationAuthenticateArgs,
    ctx: Context,
    info: any
  ) {
    console.log({ ctx });
    // let userToken = null;
    // try {
    //   userToken = await validateAndParseIdToken(idToken);
    // } catch (err) {
    //   throw new Error(err.message);
    // }
    // const auth0id = userToken.sub.split('|')[1];
    // let user = await ctx.db.user({ auth0id });
    // if (!user) {
    //   user = await createPrismaUser(ctx, userToken);
    // }
    // return user;
    return null;
  }
};
