import React from 'react';
import Input from '@material-ui/core/Input';
import { Button } from '@material-ui/core';

type Props = {
  query: string;
  onSubmit: (query: string) => void;
};

type State = {
  query: string;
};

export class Search extends React.Component<Props, State> {
  state = {
    query: this.props.query,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.query !== nextProps.query) {
      this.setState({ query: nextProps.query });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ query: '' });
    this.props.onSubmit('');
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          placeholder="Search all shows"
          inputProps={{
            'aria-label': 'Description',
          }}
          onChange={this.handleChange}
          value={this.state.query || ''}
        />
        <Button onClick={this.handleClear}>Clear</Button>
      </form>
    );
  }
}

export default Search;
