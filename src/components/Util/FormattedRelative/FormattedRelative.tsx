import React from 'react';
import { FormattedRelativeTime } from 'react-intl';
import { selectUnit } from '@formatjs/intl-utils';

type FormattedRelativeProps = {
  value: number;
};

export const FormattedRelative: React.FC<FormattedRelativeProps> = ({
  value
}) => {
  const { value: actualValue, unit } = selectUnit(value);

  return (
    <FormattedRelativeTime value={actualValue} unit={unit} numeric="auto" />
  );
};
