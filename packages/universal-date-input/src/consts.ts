import { DateSegments } from './types';

export const DATE_RANGE_SEPARATOR = ' – ';
export const DATE_TIME_SEPARATOR = ', ';

export const HOURS_MINUTES_SEPARATOR = ':';

export const DATE_POSSIBLE_SEPARATORS = /\.|\/|-|\s/;

export const DATE_MAX_VALUES: DateSegments<number> = {
    day: 31,
    month: 12,
    year: 9999,
    hours: 23,
    minutes: 59,
};

export const DEFAULT_MIN_DATE = new Date(1900, 0, 1).getTime();
export const DEFAULT_MAX_DATE = new Date(2124, 11, 31).getTime();
export const DATE_FORMAT = 'dd.MM.yyyy';

export const DATE_TIME_FORMAT = `dd.MM.yyyy${DATE_TIME_SEPARATOR}HH${HOURS_MINUTES_SEPARATOR}mm`;
