export const AUTH_CONFIG = {
  domain: process.env.REACT_APP_AUTH_DOMAIN || '',
  clientID: process.env.REACT_APP_AUTH_CLIENT_ID || '',
  redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI || '',
  dbConnectionName: process.env.REACT_APP_AUTH_DB_CONNECTION_NAME || '',
  audience: process.env.REACT_APP_AUTH_AUDIENCE || '',
};
