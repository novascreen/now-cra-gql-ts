import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
import { AUTH_CONFIG } from '../serverConstants';

const jwks = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: `https://${AUTH_CONFIG.domain}/.well-known/jwks.json`
});

const validateAndParseIdToken = (idToken: string) =>
  new Promise((resolve, reject) => {
    const { header, payload } = jwt.decode(idToken, { complete: true }) as any;
    if (!header || !header.kid || !payload) reject(new Error('Invalid Token'));
    jwks.getSigningKey(header.kid, (err, key: any) => {
      if (err) reject(new Error('Error getting signing key: ' + err.message));
      jwt.verify(
        idToken,
        key.publicKey,
        { algorithms: ['RS256'] },
        (error: any, decoded) => {
          if (error) reject('jwt verify error: ' + error.message);
          resolve(decoded);
        }
      );
    });
  });

export default validateAndParseIdToken;
