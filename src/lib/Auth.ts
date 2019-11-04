import auth0 from 'auth0-js';
import gql from 'graphql-tag';

import appHistory from 'appHistory';
import { AUTH_CONFIG } from 'appConstants';
import { ApolloClient } from 'apollo-client';

const AUTHENTICATE = gql`
  mutation authenticate($idToken: String!) {
    authenticate(idToken: $idToken) {
      id
      name
      email
    }
  }
`;

export const isAuthenticated = () => {
  // Check whether the current time is past the
  // access token's expiry time
  try {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at') || '""');
    if (!expiresAt) return false;
    return new Date().getTime() < expiresAt;
  } catch (e) {
    console.error(e);
  }
  return false;
};

export default class Auth {
  auth0: any = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.redirectUri,
    audience: AUTH_CONFIG.audience,
    responseType: 'token id_token',
    scope: 'openid profile email user_metadata app_metadata picture',
  });

  apolloClient: ApolloClient<any>;
  cb = () => {};

  constructor(cb: Function, apolloClient: ApolloClient<any>) {
    // binds functions to keep this context
    this.apolloClient = apolloClient;
    this.cb = cb.bind(this);
  }

  loginWithGoogle = (callback: Function) => {
    this.auth0.popup.authorize(
      {
        clientID: AUTH_CONFIG.clientID,
        connection: 'google-oauth2',
        redirectUri: `${window.location.origin}/auth/popup`,
      },
      (err: any, authResult: any) => {
        this.handlePopupAuthentication(err, authResult);
        if (callback) {
          callback(err, authResult);
        }
      },
    );
  };

  loginWithFacebook = (callback: Function) => {
    this.auth0.popup.authorize(
      {
        clientID: AUTH_CONFIG.clientID,
        connection: 'facebook',
        redirectUri: `${window.location.origin}/auth/popup`,
      },
      (err: any, authResult: any) => {
        this.handlePopupAuthentication(err, authResult);
        if (callback) {
          callback(err, authResult);
        }
      },
    );
  };

  handlePopupAuthentication = (err: any, authResult: any) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      this.setSession(authResult);
    } else if (err) {
      console.error(err);
    }
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err: any, authResult: any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.error(err);
      }
      appHistory.replace('/');
    });
  };

  setSession = (authResult: any) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime(),
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    const data = {
      status: `success`,
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      expiresAt,
    };
    this.signinOrCreateAccount({ ...data });
  };

  signinOrCreateAccount({ accessToken, idToken, expiresAt }: any) {
    this.apolloClient
      .mutate({
        mutation: AUTHENTICATE,
        variables: { idToken },
      })
      .then((res: any) => {
        // stay on the same page, but force update
        appHistory.replace(window.location.pathname + window.location.search);
      })
      .catch((err: Error) =>
        console.error('Sign in or create account error: ', err),
      );
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    // navigate to the home route
    appHistory.replace('/');
  };
}
