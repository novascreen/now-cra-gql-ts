import * as R from 'ramda';

export default function toggle(item: any, list: any[]) {
  if (R.contains(item, list)) {
    return R.without([item], list);
  }
  return R.append(item, list);
}
