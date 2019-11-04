import React from 'react';
import ReactAutosuggest, { AutosuggestProps } from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles';

function renderInput(inputProps: any): JSX.Element {
  return (
    <TextField fullWidth inputRef={inputProps.ref} inputProps={inputProps} />
  );
}

function renderSuggestionsContainer(
  options: ReactAutosuggest.RenderSuggestionsContainerParams
) {
  const { containerProps, children } = options;

  return (
    <Paper elevation={2} {...containerProps} square>
      {children}
    </Paper>
  );
}

type Props = AutosuggestProps<any>;

const AutoSuggest: React.SFC<Props & WithStyles<typeof styles>> = ({
  classes,
  inputProps,
  ...props
}) => (
  <ReactAutosuggest
    theme={{
      container: classes.container,
      suggestionsContainerOpen: classes.suggestionsContainerOpen,
      suggestionsList: classes.suggestionsList,
      suggestion: classes.suggestion
    }}
    renderSuggestionsContainer={renderSuggestionsContainer}
    renderInputComponent={renderInput}
    inputProps={{
      placeholder: 'Search',
      ...inputProps
    }}
    {...props}
  />
);

const styles = (theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      marginLeft: 'auto',
      marginRight: 'auto',
      left: 0,
      right: 0,
      maxWidth: 400
    },
    suggestion: {
      display: 'block'
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none'
    }
  });

export default withStyles(styles)(AutoSuggest);
