import fs from 'fs';
import path from 'path';

import { ApolloServer, AuthenticationError } from 'apollo-server-micro';
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

import { Prisma } from './generated/prisma-client';
import resolvers from './resolvers';
import directiveResolvers from './directives';
import { AUTH_CONFIG } from './serverConstants';
import { Context, Auth0User } from 'utils/utils';
import { MicroRequest } from 'apollo-server-micro/dist/types';

// Ensure the file is included in ncc build
fs.readFileSync(path.join(__dirname, '/prisma.graphql'));

const isProduction = process.env.NODE_ENV === 'production';

const client = jwksClient({
  jwksUri: `https://${AUTH_CONFIG.domain}/.well-known/jwks.json`
});

function getKey(header: any, cb: Function) {
  client.getSigningKey(header.kid, function(err, key: any) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const options = {
  audience: AUTH_CONFIG.audience,
  issuer: `https://${AUTH_CONFIG.domain}/`,
  algorithms: ['RS256']
};

const db = new Prisma({
  // the endpoint of the Prisma DB service (value is set in .env)
  endpoint: process.env.PRISMA_ENDPOINT || '',
  // taken from database/prisma.yml (value is set in .env)
  secret: process.env.PRISMA_SECRET || '',
  // log all GraphQL queries & mutations
  debug: !isProduction
});

const schema = makeExecutableSchema({
  typeDefs: importSchema(path.join(__dirname, '/schema.graphql')),
  resolvers,
  directiveResolvers
} as any);

const server = new ApolloServer({
  schema,
  context: async ({ req, ...rest }: any, ...huh: any): Promise<Context> => {
    const token = req.headers.authorization;
    console.log({ token, req, rest, huh });
    const auth0User: Auth0User = await new Promise(resolve => {
      if (!token) {
        resolve();
        return;
      }
      jwt.verify(token, getKey, options, (err, decoded: any) => {
        if (err) {
          throw new AuthenticationError('Authentication failed');
        }
        const [identity, id] = decoded.sub.split(`|`);
        console.log(decoded);
        resolve({
          email: decoded.email,
          sub: decoded.sub,
          identity,
          id
        });
      });
    });
    // const user: Context['user'] = await new Promise((resolve, reject) => {
    //   if (!auth0User) resolve();
    //   db.user({ auth0id: auth0User.id })
    //     .then(resolve)
    //     .catch(() => {
    //       throw new AuthenticationError('User not found');
    //     });
    // });
    return {
      // user,
      auth0User,
      db
      // variables: get(req, 'body.variables')
    };
  },
  introspection: true,
  playground: true
});

export default server.createHandler({ path: '/api' });
