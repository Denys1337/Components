import { DateTimeFormatOptions } from '@intlify/core-base';

import { ContentType, formatValueToString } from '@agritask/js-utils/libs/string_utils';

import booleanToWord from './booleanToWord';
import getTranslators from './getTranslators';

const dateOptions: DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const formatValueToStringWithBoolean = (
  value: ContentType,
  valueKey = 'text',
  separator = ', '
) => {
  if (typeof value === 'boolean') {
    return booleanToWord(value);
  }

  if (value instanceof Date) {
    const { locale } = getTranslators();
    return value.toLocaleDateString(locale.value, dateOptions);
  }

  return formatValueToString(value, valueKey, separator);
};

export default formatValueToStringWithBoolean;
