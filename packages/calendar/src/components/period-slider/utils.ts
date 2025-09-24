import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addQuarters from 'date-fns/addQuarters';
import addWeeks from 'date-fns/addWeeks';
import addYears from 'date-fns/addYears';
import differenceInDays from 'date-fns/differenceInDays';
import endOfMonth from 'date-fns/endOfMonth';
import endOfQuarter from 'date-fns/endOfQuarter';
import endOfWeek from 'date-fns/endOfWeek';
import endOfYear from 'date-fns/endOfYear';
import getQuarter from 'date-fns/getQuarter';
import getYear from 'date-fns/getYear';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import startOfMonth from 'date-fns/startOfMonth';
import startOfQuarter from 'date-fns/startOfQuarter';
import startOfWeek from 'date-fns/startOfWeek';
import startOfYear from 'date-fns/startOfYear';

import { formatDate, monthName } from '../../utils';

import { type PeriodType } from '.';

export const formatPeriod = (
    valueFrom: Date,
    valueTo: Date,
    periodType: PeriodType,
    showCurrentYear?: boolean,
) => {
    if (periodType === 'day') {
        if (isToday(valueFrom)) return 'Сегодня';
        if (isYesterday(valueFrom)) return 'Вчера';

        return formatDate(valueFrom);
    }

    if (periodType === 'month') {
        const monthAndYear = `${monthName(valueFrom)} ${getYear(valueFrom)}`;

        if (showCurrentYear) {
            return monthAndYear;
        }
        const year = getYear(valueFrom);

        return year === getYear(new Date()) ? monthName(valueFrom) : monthAndYear;
    }

    if (periodType === 'quarter') {
        return `${getQuarter(valueFrom)} квартал ${getYear(valueFrom)}`;
    }

    if (periodType === 'year') {
        return `${getYear(valueFrom)} год`;
    }

    return `${formatDate(valueFrom)} - ${formatDate(valueTo)}`;
};

export const getYearSelectorValue = (valueFrom: Date | undefined, showCurrentYear: boolean) => {
    if (!valueFrom) {
        return '';
    }

    const year = getYear(valueFrom);

    if (year === getYear(new Date())) {
        return showCurrentYear ? year : '';
    }

    return year;
};

export const shiftValues = (
    valueFrom: Date,
    valueTo: Date,
    periodType: PeriodType,
    direction: 'prev' | 'next',
) => {
    let newValueFrom = valueFrom;
    let newValueTo = valueTo;

    const amount = direction === 'next' ? 1 : -1;

    switch (periodType) {
        case 'day':
            newValueFrom = addDays(valueFrom, amount);
            newValueTo = addDays(valueFrom, amount);
            break;
        case 'week':
            newValueFrom = startOfWeek(addWeeks(valueFrom, amount), { weekStartsOn: 1 });
            newValueTo = endOfWeek(newValueFrom, { weekStartsOn: 1 });
            break;
        case 'month':
            newValueFrom = startOfMonth(addMonths(valueFrom, amount));
            newValueTo = endOfMonth(newValueFrom);
            break;
        case 'quarter':
            newValueFrom = startOfQuarter(addQuarters(valueFrom, amount));
            newValueTo = endOfQuarter(newValueFrom);
            break;
        case 'year':
            newValueFrom = startOfYear(addYears(valueFrom, amount));
            newValueTo = endOfYear(newValueFrom);
            break;
        case 'range': {
            const diffInDays = differenceInDays(valueTo, valueFrom);

            newValueFrom = addDays(valueFrom, diffInDays * amount);
            newValueTo = addDays(valueTo, diffInDays * amount);
            break;
        }
        default:
            break;
    }

    return {
        valueFrom: newValueFrom,
        valueTo: newValueTo,
    };
};
