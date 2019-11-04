import * as R from 'ramda';

import { getScheduleByDate } from '../../tvmaze/api';
import { combineResults } from '../../utils/utils';
import { QueryScheduleByDateArgs } from '../../types';

const eqIdAirstamp = (a: any, b: any) =>
  R.eqProps('id', a, b) && R.eqProps('airstamp', a, b);

export default function scheduleByDate(
  parent: any,
  { date }: QueryScheduleByDateArgs
) {
  const dates = date.split(',');
  if (dates.length > 1) {
    return (
      Promise.all(dates.map(d => getScheduleByDate(d)))
        .then(combineResults)
        // Filter duplicates (midnight episodes)
        .then(results => R.uniqWith(eqIdAirstamp, results))
    );
  }
  return getScheduleByDate(date);
}
