import React from 'react';
import { Router, Switch, Route } from 'react-router';

import withRoot, { auth } from 'withRoot';
import appHistory from 'appHistory';
import { Loading } from 'components/UI/Loading';
import App from './App';

const handleAuthentication = ({ location }: any) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

class Popup extends React.Component {
  componentDidMount() {
    // Closes popup if possible
    auth.auth0.popup.callback();

    // In some scenarios like Android Web APK (Installed to Homescreen)
    // the popup can't be close
    // In this case we handle authentication in the current window
    setTimeout(() => {
      handleAuthentication({ location: window.location });
    }, 100);
  }

  render() {
    return null;
  }
}

export const AppContainer = () => (
  <Router history={appHistory}>
    <Switch>
      <Route exact path="/auth/popup" component={Popup} />
      <Route
        exact
        path="/auth/callback"
        render={props => {
          handleAuthentication(props);
          return <Loading />;
        }}
      />
      <Route component={App} />
    </Switch>
  </Router>
);

export default withRoot(AppContainer);
