import React from 'react';
import Select, { SelectProps } from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const TimeSelector = (props: SelectProps) => (
  <Select {...props}>
    <MenuItem value="upcoming">Upcoming</MenuItem>
    <MenuItem value="previous">Previous</MenuItem>
  </Select>
);

export default TimeSelector;
