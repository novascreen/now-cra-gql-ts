import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton/IconButton';
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Slide from '@material-ui/core/Slide';
import { compose } from '@material-ui/system';
import Grid from '@material-ui/core/Grid/Grid';
import Input from '@material-ui/core/Input';
import { withRouter, RouteComponentProps } from 'react-router';

import Box from 'components/UI/Box';

type Props = WithStyles<typeof styles> & RouteComponentProps<{}>;

type State = {
  open: boolean;
  value: string;
};

export class Search extends React.Component<Props, State> {
  state = {
    open: false,
    value: ''
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      value: ''
    });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.currentTarget.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.handleClose();
    this.props.history.push(`/shows?search=${this.state.value}`);
  };

  render() {
    const { classes } = this.props;
    const { open, value } = this.state;
    return (
      <>
        <IconButton color="inherit" onClick={this.handleOpen}>
          <SearchIcon />
        </IconButton>
        <Slide direction="left" in={open}>
          <div className={classes.search}>
            {open && (
              <ClickAwayListener onClickAway={this.handleClose}>
                <Grid container justify="space-between" alignItems="center">
                  <Box ml={2} className={classes.autoSuggestBox}>
                    {open && (
                      <form onSubmit={this.handleSubmit}>
                        <Input
                          value={value}
                          onChange={this.handleChange}
                          placeholder="Search all shows"
                          autoFocus
                          fullWidth
                        />
                      </form>
                    )}
                  </Box>
                  <IconButton onClick={this.handleClose}>
                    <Close />
                  </IconButton>
                </Grid>
              </ClickAwayListener>
            )}
          </div>
        </Slide>
      </>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    search: {
      display: 'flex',
      position: 'absolute',
      width: '100%',
      top: 0,
      right: 0,
      zIndex: 1,
      background: theme.palette.background.paper,
      ...theme.mixins.toolbar
    },
    autoSuggestBox: {
      flexGrow: 1
    }
  });

export default compose(
  withStyles(styles),
  withRouter
)(Search);
