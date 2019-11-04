import { RouteComponentProps } from 'react-router';
import { UnregisterCallback, Href } from 'history';

// This is to mock out the dependencies for react router
export function getMockRouterProps<P>(data: P) {
  var location = {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: {},
  };

  var props: RouteComponentProps<P> = {
    match: {
      isExact: true,
      params: data,
      path: '',
      url: '',
    },
    location: location,
    history: {
      length: 2,
      action: 'POP',
      location: location,
      push: () => {},
      replace: () => {},
      go: num => {},
      goBack: () => {},
      goForward: () => {},
      block: t => {
        var temp: UnregisterCallback = () => null;
        return temp;
      },
      createHref: t => {
        var temp: Href = '';
        return temp;
      },
      listen: t => {
        var temp: UnregisterCallback = () => null;
        return temp;
      },
    },
    staticContext: {},
  };

  return props;
}
