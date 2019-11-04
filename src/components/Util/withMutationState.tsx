import React from 'react';

const withMutationState = ({ name = 'mutate' } = {}) => (
  WrappedComponent: any,
) =>
  class extends React.Component {
    loadingProperty = `${name}Loading`;
    errorProperty = `${name}Error`;
    resultProperty = `${name}Result`;

    state = { loading: false, error: null, result: null };

    handleMutation = (options: any) => {
      const props: any = this.props;
      this.setState({
        loading: true,
        error: null,
        result: null,
      });
      return props[name](options)
        .then((result: any) => {
          this.setState({
            loading: false,
            error: null,
            result: result,
          });
        })
        .catch((err: Error) => {
          this.setState({
            loading: false,
            error: err,
            result: null,
          });
        });
    };

    render() {
      const props = {
        ...this.props,
        [name]: this.handleMutation,
        [this.loadingProperty]: this.state.loading,
        [this.errorProperty]: this.state.error,
        [this.resultProperty]: this.state.result,
      };
      return <WrappedComponent {...props} />;
    }
  };

export default withMutationState;
