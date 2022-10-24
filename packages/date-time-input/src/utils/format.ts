/* eslint-disable no-useless-escape */

import dateFnsIsValid from 'date-fns/isValid';
import parse from 'date-fns/parse';

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

export const isCompleteDateInput = (input: string) => input.length === DATE_MASK.length;

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
        .replace(/^(\d\d.\d\d\.\d\d\d\d), (\d\d)(\d)/, '$1, $2:$3'); // 12.12.2005, 000 => 12.12.2005, 00:0

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

    return fullDate;
};

export const setTimeToDate = (value: string): string => {
    if (value.length === 10 && dateFnsIsValid(parseDateString(value))) {
        return `${value}, 00:00`;
    }

    return value;
};
