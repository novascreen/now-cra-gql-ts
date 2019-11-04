import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { Show } from 'graphql/types';

type Props = {
  show: Show;
};

export const Info = ({ show }: Props) => (
  <Table>
    <TableBody>
      {show.webChannel && (
        <TableRow style={{ height: 40 }}>
          <TableCell padding="none">
            <Typography>Streamed on:</Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {show.webChannel.name} ({show.airedYears})
            </Typography>
          </TableCell>
        </TableRow>
      )}
      {show.network && (
        <TableRow style={{ height: 40 }}>
          <TableCell padding="none">
            <Typography>Airs on:</Typography>
          </TableCell>
          <TableCell>
            <Typography>
              {show.network.name} ({show.airedYears})
            </Typography>
          </TableCell>
        </TableRow>
      )}
      {show.schedule &&
        show.schedule.time && (
          <TableRow style={{ height: 40 }}>
            <TableCell padding="none">
              <Typography>Schedule:</Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {(show.schedule.days || []).join(', ')} at {show.schedule.time}{' '}
                ({show.runtime} min)
              </Typography>
            </TableCell>
          </TableRow>
        )}
      <TableRow style={{ height: 40 }}>
        <TableCell padding="none">
          <Typography>Status:</Typography>
        </TableCell>
        <TableCell>
          <Typography>{show.status}</Typography>
        </TableCell>
      </TableRow>
      <TableRow style={{ height: 40 }}>
        <TableCell padding="none">
          <Typography>Show Type:</Typography>
        </TableCell>
        <TableCell>
          <Typography>Scripted</Typography>
        </TableCell>
      </TableRow>
      {show.genres && (
        <TableRow style={{ height: 40 }}>
          <TableCell padding="none">
            <Typography>Genres:</Typography>
          </TableCell>
          <TableCell>
            <Typography>{show.genres.join(', ')}</Typography>
          </TableCell>
        </TableRow>
      )}
      {show.officialSite && (
        <TableRow style={{ height: 40 }}>
          <TableCell padding="none">
            <Typography>Official site:</Typography>
          </TableCell>
          <TableCell>
            <a href={show.officialSite} rel="noopener noreferrer">
              <Typography>{show.officialSite}</Typography>
            </a>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default Info;
