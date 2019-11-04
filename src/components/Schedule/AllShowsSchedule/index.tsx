import React from 'react';

import AllShowsList from 'components/Schedule/AllShowsList';

type Props = {
  previous?: boolean;
};

export class AllShowsSchedule extends React.Component<Props> {
  render() {
    const { previous } = this.props;
    return (
      <>
        <AllShowsList previous={previous} />
      </>
    );
  }
}

export default AllShowsSchedule;
