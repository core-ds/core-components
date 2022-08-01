/* eslint-disable no-useless-escape */

export const DATE_MASK = [/\d/, /\d/, ':', /\d/, /\d/];

export const isCompleteTimeInput = (input: string) => input.length === DATE_MASK.length;

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

export const isValidInputValue = (inputValue?: string) =>
    !inputValue || (isCompleteTimeInput(inputValue) && isValidTimeFormat(inputValue));

export const format = (value: string): string =>
    value
        .replace(/^(\d\d)(\d)$/, '$1:$2') // 123 => 12:3
        .replace(/^(\d\d)(\d\d)/, '$1:$2') // 12345 => 12:45 (если вместо двоеточия введена цифра, она обратно заменяется на двоеточие)
        .replace(/^(\d):(\d\d)(\d)/, '$1:$2') // 1:234 => 1:23
        .replace(/\:$/, ''); // 12: => 12 || : => void
