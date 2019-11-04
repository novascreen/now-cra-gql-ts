import { AUTH_CONFIG } from '../serverConstants';

import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
// Authentication middleware. When used, the
// if the access token exists, it be verified against
// the Auth0 JSON Web Key Set
export const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 1,
    jwksUri: `https://${AUTH_CONFIG.domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  credentialsRequired: false,
  audience: AUTH_CONFIG.audience,
  issuer: `https://${AUTH_CONFIG.domain}/`,
  algorithms: [`RS256`]
});
