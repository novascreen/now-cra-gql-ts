import React from 'react';
import { Show } from 'graphql/types';
// import { Grid, Typography } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import appHistory from 'appHistory';
import FavoriteToggle from '../FavoriteToggle';

type Props = {
  shows: Show[];
};

export const List = ({ shows, width }: Props & WithWidth) => {
  let cols = 5;
  if (width === 'md') cols = 4;
  if (width === 'sm') cols = 3;
  if (width === 'xs') cols = 2;
  return (
    <GridList cellHeight="auto" cols={cols}>
      {!Boolean(shows.length)
        ? 'No favorite shows found'
        : shows.map((show: Show) => {
            const { id, name, image, premiered, network } = show;
            const year = premiered ? premiered.split('-')[0] : '';
            const networkName = network && network.name;
            let secondaryText = year ? [year] : [];
            secondaryText = secondaryText.concat(
              networkName ? [networkName] : [],
            );
            if (!id) return null;
            return (
              <GridListTile
                key={id}
                // TODO: Cleanup to use real Link
                onClick={() => appHistory.push(`/shows/${id}`)}
                style={{ cursor: 'pointer' }}
              >
                {image && image.medium && <img src={image.medium} alt={`${show.name}`} />}
                <GridListTileBar
                  title={name}
                  subtitle={secondaryText.join(', ')}
                  actionIcon={<FavoriteToggle showId={id} />}
                />
              </GridListTile>
            );
          })}
    </GridList>
  );
};

export default withWidth()(List);
