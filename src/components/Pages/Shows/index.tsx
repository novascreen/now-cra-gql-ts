import React from 'react';
import { RouteComponentProps } from 'react-router';
import qs from 'query-string';
import Grid from '@material-ui/core/Grid';
import Box from 'components/UI/Box';
import Search from 'components/Shows/Search';
import SearchResults from 'components/Shows/SearchResults';
import Favorites from 'components/Shows/Favorites';

type Props = {} & RouteComponentProps<{}>;

type State = {
  query: string;
};

const getQuery = (props: Props) => {
  const search = qs.parse(props.location.search).search;
  return typeof search === 'string' ? search : '';
};

export class Shows extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      query: getQuery(props),
    };
  }

  handleSubmit = (query: string) => {
    this.props.history.push(`/shows?search=${query}`);
  };

  render() {
    const query = getQuery(this.props);
    return (
      <>
        <Box my={3}>
          <Grid container justify="center">
            <Search query={query} onSubmit={this.handleSubmit} />
          </Grid>
        </Box>
        <Box my={3}>
          {query && <SearchResults query={query} />}
          <Box mt={3}>
            <Favorites />
          </Box>
        </Box>
      </>
    );
  }
}

export default Shows;
