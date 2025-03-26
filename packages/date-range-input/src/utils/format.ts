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
    ' ',
    '-',
    ' ',
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
];

export const isCompleteDateInput = (input: string) => input.length === DATE_MASK.length;

export const parseDateString = (value: string, dateFormat = DATE_FORMAT) =>
    parse(value, dateFormat, new Date());

export const isValid = (inputValue: string, dateFrom: string, dateTo: string) =>
    !inputValue ||
    (isCompleteDateInput(inputValue) &&
        dateFnsIsValid(parseDateString(dateFrom)) &&
        dateFnsIsValid(parseDateString(dateTo)));

export const format = (value: string): string =>
    value
        .replace(/^(\d\d)(\d)$/, '$1.$2') // 121 => 12.1
        .replace(/^(\d\d)\.(\d\d)(\d)$/, '$1.$2.$3') // 12.122 => 12.12.2
        .replace(/^(\d\d)\d\.(.*)/, '$1.$2') // 123.12.2005 => 12.12.2005
        .replace(/^(\d\d\.\d\d)\d\.(.*)/, '$1.$2') // 12.123.2005 => 12.12.2005
        .replace(/\.$/, '') // 12. => 12
        .replace(/\ $/, '') // 1 2 => 12
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)(\d) - (\d.*)/, '$1 - $3') // 12.12.20051 - 12.12.200 => 12.12.2005 - 12.12.200
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) (\d)- (\d.*)/, '$1 - $3') // 12.12.2005 1- 12.12.200 => 12.12.2005 - 12.12.200
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) -(\d) (\d.*)/, '$1 - $3') // 12.12.2005 -1 12.12.200 => 12.12.2005 - 12.12.200
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) - (\d)(\d\d.\d\d.\d\d\d)/, '$1 - $3') // 12.12.2005 - 112.12.200 => 12.12.2005 - 12.12.200
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) - (\d)(\d\d.\d.\d\d\d\d)/, '$1 - $3') // 12.12.2005 - 112.1.2001 => 12.12.2005 - 12.1.2001
        .replace(/^(\d\d\.\d\d)(\d\d\d\d)/, '$1.$2') // 12.122005 => 12.12.2005
        .replace(/^(\d\d)(\d\d\.\d\d\d\d)/, '$1.$2') // 1212.2005 => 12.12.2005
        .replace(/^(\d\d)(\d.*)/, '$1.$2') // 1212 => 12.12
        .replace(/^(\d\d.\d\d)(\d.*)/, '$1.$2') // 12.122 => 12.12.2
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)(\d)/, '$1 - $2') // 12.12.20056 => 12.12.2005 - 6
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) - (\d\d)(\d)/, '$1 - $2.$3') // 12.12.2005 - 123 => 12.12.2005 - 12.3
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) - (\d\d).(\d\d)(\d)/, '$1 - $2.$3.$4') // 12.12.2005 - 12.123 => 12.12.2005 - 12.12.3
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)- (\d.*)/, '$1 - $2') // 12.12.2005- 12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) -(\d.*)/, '$1 - $2') // 12.12.2005 -12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) -/, '$1') // 12.12.2005 - => 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) (\d.*)/, '$1 - $2') // 12.12.2005 12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)  {2}(\d.*)/, '$1 - $2') // 12.12.2005  12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)-/, '$1') // 12.12.2005- => 12.12.2005
        .replace(/^(\d\.\d\d\.\d\d\d\d)([0-9]*)/, '$1') // 1.12.2005123123 => 1.12.2005
        .replace(/^(\d\d\.\d\.\d\d\d\d)([0-9]*)/, '$1') // 01.2.20055125125 => 01.2.2005
        .replace(/^(\d)\.(\d\d)([0-9]*)\.(\d\d\d\d)/, '$1.$2.$4') // 1.123123.2005 => 1.12.2005
        .replace(/^(\d\.\d\.\d\d\d\d)([0-9]*)/, '$1') // 1.2.20055125125 => 1.2.2005
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
