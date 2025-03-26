/* eslint-disable no-useless-escape */

import { isValid as dateFnsIsValid, parse } from 'date-fns';

export const DATE_FORMAT = 'dd.MM.yyyy';
export const DATE_MASK = [
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ',',
    ' ',
    /\d/,
    /\d/,
    ':',
    /\d/,
    /\d/,
];

export const DATE_WITH_TIME_LENGTH = DATE_MASK.length;
export const isCompleteDateInput = (input: string) => input.length === DATE_WITH_TIME_LENGTH;
export const parseDateString = (value: string, dateFormat = DATE_FORMAT) =>
    parse(value, dateFormat, new Date());
export const isValidTimeFormat = (value: string): boolean => {
    const timeArr = value.split(':');
    const hours = timeArr[0];
    const mins = timeArr[1];

    if (hours.length !== 2 || Number(hours) > 23) {
        return false;
    }

    if (mins.length !== 2 || Number(mins) > 59) {
        return false;
    }

    return true;
};

export const isValid = (inputValue: string) => {
    const inputValueArr = inputValue.split(', ');
    const date = inputValueArr[0];
    const time = inputValueArr[1];

    return (
        !inputValue ||
        (isCompleteDateInput(inputValue) &&
            dateFnsIsValid(parseDateString(date)) &&
            isValidTimeFormat(time))
    );
};

export const format = (value: string): string =>
    value
        .replace(/^(\d\d)(\d)$/, '$1.$2') // 121 => 12.1
        .replace(/^(\d\d)\.(\d\d)(\d)$/, '$1.$2.$3') // 12.122 => 12.12.2
        .replace(/^(\d\d)\d\.(.*)/, '$1.$2') // 123.12.2005 => 12.12.2005
        .replace(/^(\d\d\.\d\d)\d\.(.*)/, '$1.$2') // 12.123.2005 => 12.12.2005
        .replace(/\.$/, '') // 12. => 12
        .replace(/\ $/, '') // 1 2 => 12
        .replace(/\:$/, '') // 1:2 => 12
        .replace(/^(\d\d)(\d.*)/, '$1.$2') // 1212 => 12.12
        .replace(/^(\d\d.\d\d)(\d.*)/, '$1.$2') // 12.122 => 12.12.2
        .replace(/^(\d\d\.\d\d)(\d\d\d\d)/, '$1.$2') // 12.122005 => 12.12.2005
        .replace(/^(\d\d)(\d\d\.\d\d\d\d)/, '$1.$2') // 1212.2005 => 12.12.2005
        .replace(/^(\d\d.\d\d\.\d\d\d\d),/, '$1') // 12.12.2005 => 12.12.2005
        .replace(/^(\d\d.\d\d\.\d\d\d\d)(\d)/, '$1, $2') // 12.12.20050 => 12.12.2005, 0
        .replace(/^(\d\d.\d\d\.\d\d\d\d),(\d.*)/, '$1, $2') // 12.12.2005,00:00 => 12.12.2005, 00:00
        .replace(/^(\d\d.\d\d\.\d\d\d\d) (\d.*)/, '$1, $2') // 12.12.2005 00:00 => 12.12.2005, 00:00
        .replace(/^(\d\d.\d\d\.\d\d\d\d)(\d.*)/, '$1, $2') // 12.12.200500:00=> 12.12.2005, 00:00
        .replace(/^(\d\d.\d\d\.\d\d\d\d), (\d\d):/, '$1, $2') // 12.12.2005, 00: => 12.12.2005, 00
        .replace(/^(\d\d.\d\d\.\d\d\d\d), (\d\d)(\d)/, '$1, $2:$3') // 12.12.2005, 000 => 12.12.2005, 00:0
        .replace(/^(\d\.\d\d\.\d\d\d\d)([0-9]*)/, '$1') // 1.12.2005123123 => 1.12.2005
        .replace(/^(\d\d\.\d\.\d\d\d\d)([0-9]*)/, '$1') // 01.2.20055125125 => 01.2.2005
        .replace(/^(\d)\.(\d\d)([0-9]*)\.(\d\d\d\d)/, '$1.$2.$4') // 1.123123.2005 => 1.12.2005
        .replace(/^(\d\.\d\.\d\d\d\d)([0-9]*)/, '$1') // 1.2.20055125125 => 1.2.2005
        .replace(/^(\d\d)\.()\.(\d\d\d\d)([0-9]*)/, '$1.$2.$3') // 01..2005123123 => 01..2005
        .replace(/^(\d)\.()\.(\d\d\d\d)([0-9]*)/, '$1.$2.$3') // 1..2005123123 => 1..2005
        .replace(/^()\.()\.(\d\d\d\d)([0-9]*)/, '$1.$2.$3') // ..2005123123 => ..2005
        .replace(/^()\.(\d)\.(\d\d\d\d)([0-9]*)/, '$1.$2.$3'); // .2.2005123123 => .2.2005

export const parseTimestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();

    let month: number | string = date.getMonth() + 1;
    let day: number | string = date.getDate();

    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`;
    }

    return `${day}.${month}.${year}`;
};

export const getDateWithoutTime = (value: string): Date => {
    const valueArr = value.split(', ');

    let day;
    let month;
    let year;

    if (valueArr[0]) {
        const date = valueArr[0].split('.');

        [day, month, year] = date;
    }

    const date = new Date();

    date.setFullYear(Number(year), Number(month) - 1, Number(day));
    date.setHours(0, 0, 0, 0);

    return date;
};

export const getFullDateTime = (value: string): Date => {
    const valueArr = value.split(', ');

    let day;
    let month;
    let year;
    let hours;
    let mins;

    if (valueArr[0]) {
        const date = valueArr[0].split('.');

        [day, month, year] = date;
    }
    if (valueArr[1]) {
        const time = valueArr[1].split(':');

        hours = Number(time[0]);
        mins = Number(time[1]);
    }

    const fullDate = new Date();

    fullDate.setFullYear(Number(year), Number(month) - 1, Number(day));
    fullDate.setHours(Number(hours) || 0);
    fullDate.setMinutes(Number(mins) || 0);
    fullDate.setSeconds(0);
    fullDate.setMilliseconds(0);

    return fullDate;
};

export const addTimeToDate = (value: string): string => {
    if (value.length === 10 && dateFnsIsValid(parseDateString(value))) {
        return `${value}, 00:00`;
    }

    return value;
};
