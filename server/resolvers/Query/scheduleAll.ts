import * as R from 'ramda';
import moment from 'moment';

import { getScheduleByDate } from '../../tvmaze/api';
import { combineResults } from '../../utils/utils';
import { QueryScheduleAllArgs } from '../../types';

const DATE_FORMAT = 'YYYY-MM-DD';

const eqIdAirstamp = (a: any, b: any) =>
  R.eqProps('id', a, b) && R.eqProps('airstamp', a, b);

export default function scheduleAll(
  parent: any,
  { previous }: QueryScheduleAllArgs
) {
  const date = new Date();
  const dates = [
    moment(date)
      .subtract(1, 'day')
      .format(DATE_FORMAT),
    moment(date).format(DATE_FORMAT),
    moment(date)
      .add(1, 'day')
      .format(DATE_FORMAT)
  ];
  return (
    Promise.all(dates.map(d => getScheduleByDate(d)))
      .then(combineResults)
      // Filter duplicates (midnight episodes)
      .then(results => R.uniqWith(eqIdAirstamp, results))
      .then(results =>
        results.filter(episode => {
          const episodeDate = moment(episode.airstamp);
          return previous
            ? episodeDate.isSameOrBefore(date)
            : episodeDate.isSameOrAfter(date);
        })
      )
      .then(results => (previous ? R.reverse(results) : results))
  );
}
