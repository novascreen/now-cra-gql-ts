import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { FormattedDate, FormattedTime } from 'react-intl';
import Typography from '@material-ui/core/Typography/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Infinite from 'react-infinite';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import Avatar from '@material-ui/core/Avatar';

import { Episode } from 'graphql/types';
import FavoriteToggle from 'components/Shows/FavoriteToggle';
import Box from 'components/UI/Box';
import getInitials from 'lib/getInitials';
import EpisodeNumber from 'components/Episodes/EpisodeNumber';
import { compose } from '@material-ui/system';
import { FormattedRelative } from 'components/Util/FormattedRelative/FormattedRelative';

export interface Props {
  episodes?: Episode[];
  disableInfinite?: boolean;
}

export class EpisodesList extends React.Component<
  RouteComponentProps<{}> & Props & WithWidth
> {
  renderWrapper(children: React.ReactNode) {
    const { disableInfinite, width } = this.props;
    const smallScreen = width === 'xs';

    if (disableInfinite) {
      return <>{children}</>;
    }

    return (
      <Infinite
        elementHeight={smallScreen ? 118.5 : 65.5}
        useWindowAsScrollContainer
      >
        {children}
      </Infinite>
    );
  }
  render() {
    const { episodes = [], width } = this.props;
    const smallScreen = width === 'xs';
    return (
      <Paper elevation={2}>
        <List>
          {this.renderWrapper(
            episodes.map((episode, i) => {
              if (!episode.show) return null;

              const show = episode.show;
              const showInitials = getInitials(show.name || '');
              const isLast = episodes.length - 1 === i;

              return (
                <ListItem
                  key={`${episode.id}-${episode.airstamp}`}
                  divider={!isLast}
                >
                  <Box mr={2}>
                    {show.image && show.image.medium ? (
                      smallScreen ? (
                        <img
                          src={show.image.medium}
                          style={{ width: 40, height: 'auto' }}
                          alt={`${show.name}`}
                        />
                      ) : (
                        <Avatar src={show.image.medium} />
                      )
                    ) : (
                      <Avatar>{showInitials}</Avatar>
                    )}
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={7}>
                      <>
                        <Link to={`/shows/${show.id}`}>
                          <Typography variant="subtitle1">
                            {show.name}
                          </Typography>
                        </Link>
                        <Link to={`/shows/${show.id}/episodes/${episode.id}`}>
                          <Typography variant="caption" component="div">
                            <EpisodeNumber episode={episode} /> - {episode.name}
                          </Typography>
                        </Link>
                      </>
                    </Grid>
                    {episode.airstamp && (
                      <Grid item xs={12} sm={5}>
                        <Typography>
                          <FormattedRelative value={Number(episode.airstamp)} />
                        </Typography>
                        <Typography variant="caption" component="div">
                          <FormattedDate value={episode.airstamp} />{' '}
                          <FormattedTime value={episode.airstamp} />
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                  {show.id && (
                    <ListItemSecondaryAction>
                      <FavoriteToggle showId={show.id} />
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              );
            })
          )}
        </List>
      </Paper>
    );
  }
}

// withRouter<RouteComponentProps<{}> & Props>
export default compose(
  withRouter,
  withWidth()
)(EpisodesList);
