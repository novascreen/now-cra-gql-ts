import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { Typography } from '@material-ui/core';
import Loading from 'components/UI/Loading';
import List from 'components/Shows/List';
import { Show } from 'graphql/types';

interface Data {
  search: [Show];
}

interface Variables {
  query?: string;
}

const SEARCH = gql`
  query Search($query: String!) {
    search(query: $query) {
      id
      name
      premiered
      image {
        medium
      }
      network {
        name
      }
    }
  }
`;

type Props = {} & Variables;

export const SearchResults = ({ query }: Props) => {
  const { loading, data } = useQuery<Data, Variables>(SEARCH, {
    variables: { query }
  });
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Search results for: {query}
      </Typography>
      {loading && <Loading />}
      {(!data || !data.search || !data.search.length) && (
        <Typography>No shows found</Typography>
      )}
      {data && <List shows={data.search} />}
    </>
  );
};

export default SearchResults;
