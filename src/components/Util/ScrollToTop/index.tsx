import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as R from 'ramda';

type Props = RouteComponentProps<{}>;

export class ScrollToTop extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    const noScroll = R.path(['state', 'noScroll'], this.props.location);

    if (!noScroll && this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
