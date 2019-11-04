import { Prisma, User } from '../generated/prisma-client';
import { AuthenticationError } from 'apollo-server-core';

export type Auth0User = {
  sub: string;
  email: string;
  identity: string;
  id: string;
};

export type Context = {
  db: Prisma;
  auth0User?: Auth0User;
  user?: User;
  // variables: any;
};

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

// export function getUserId(ctx: Context) {
//   const Authorization = ctx.req.get('Authorization');
//   if (Authorization) {
//     const token = Authorization.replace('Bearer ', '');
//     const { userId } = jwt.verify(token, process.env.APP_SECRET) as {
//       userId: string;
//     };
//     return userId;
//   }

//   throw new AuthError();
// }

export const isLoggedIn = (ctx: Context) => {
  if (!ctx.user)
    throw new AuthenticationError(`You must be logged in to do this`);
  return ctx.user;
};

export const combineResults = (results: any[]) =>
  results.reduce((a, b) => a.concat(b), []);
