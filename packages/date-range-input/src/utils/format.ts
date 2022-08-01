import parse from 'date-fns/parse';
import dateFnsIsValid from 'date-fns/isValid';

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

        // eslint-disable-next-line no-useless-escape
        .replace(/\ $/, '') // 1 2 => 12
        .replace(/^(\d\d\.\d\d)(\d\d\d\d)/, '$1.$2') // 12.122005 => 12.12.2005
        .replace(/^(\d\d)(\d\d\.\d\d\d\d)/, '$1.$2') // 1212.2005 => 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)(\d)/, '$1 - $2') // 12.12.20056 => 12.12.2005 - 6
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) - (\d\d)(\d)/, '$1 - $2.$3') // 12.12.2005 - 123 => 12.12.2005 - 12.3
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) - (\d\d).(\d\d)(\d)/, '$1 - $2.$3.$4') // 12.12.2005 - 12.123 => 12.12.2005 - 12.12.3
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)- (\d.*)/, '$1 - $2') // 12.12.2005- 12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) -(\d.*)/, '$1 - $2') // 12.12.2005 -12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) -/, '$1') // 12.12.2005 - => 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) (\d.*)/, '$1 - $2') // 12.12.2005 12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d) {2}(\d.*)/, '$1 - $2') // 12.12.2005  12.12.2005 => 12.12.2005 - 12.12.2005
        .replace(/^(\d\d\.\d\d\.\d\d\d\d)-/, '$1'); // 12.12.2005- => 12.12.2005

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
