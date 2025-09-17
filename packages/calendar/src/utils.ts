import { type ReactNode } from 'react';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import eachMonthOfInterval from 'date-fns/eachMonthOfInterval';
import eachYearOfInterval from 'date-fns/eachYearOfInterval';
import endOfDay from 'date-fns/endOfDay';
import endOfWeek from 'date-fns/endOfWeek';
import endOfYear from 'date-fns/endOfYear';
import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import isThisMonth from 'date-fns/isThisMonth';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import max from 'date-fns/max';
import min from 'date-fns/min';
import parse from 'date-fns/parse';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import startOfYear from 'date-fns/startOfYear';
import subDays from 'date-fns/subDays';
import subMonths from 'date-fns/subMonths';

import { getDataTestId } from '@alfalab/core-components-shared';

import {
    type DateShift,
    type Day,
    type DayAddons,
    type Month,
    type SpecialDays,
    type SpecialDaysAddon,
} from './typings';
import { type CalendarProps } from '.';

export const DAYS_IN_WEEK = 7;
export const MONTHS_IN_YEAR = 12;
export const SUNDAY_INDEX = 6;
export const DATE_FORMAT = 'dd.MM.yyyy';
export const NATIVE_DATE_FORMAT = 'yyyy-MM-dd';

export const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

/**
 * Возвращает «правильный» индекс дня недели, 0 - пн, 1 - вт и так далее.
 */
export function russianWeekDay(date: Date): number {
    const sunday = 0;
    const foreignWeekDayIndex = date.getDay();

    return foreignWeekDayIndex === sunday ? DAYS_IN_WEEK - 1 : foreignWeekDayIndex - 1;
}

/**
 * Возвращает таблицу-календарь с заполненными датами для переданного месяца
 */
export function generateWeeks(
    month: Date,
    options: {
        minDate?: Date;
        maxDate?: Date;
        selected?: Date;
        eventsMap?: SpecialDays;
        offDaysMap?: SpecialDays;
        holidaysMap?: SpecialDays;
        dayAddonsMap?: SpecialDaysAddon;
    },
) {
    const newWeek = () => Array(DAYS_IN_WEEK).fill(null);

    const start = startOfMonth(month);
    const end = lastDayOfMonth(start);

    let week = newWeek();

    return eachDayOfInterval({ start, end }).reduce((weeks: Day[][], day: Date) => {
        const weekDay = russianWeekDay(day);

        week[weekDay] = buildDay(day, options);

        if (weekDay === SUNDAY_INDEX || isSameDay(day, end)) {
            weeks.push(week);
            week = newWeek();
        }

        return weeks;
    }, []);
}

/**
 * Возвращает массив с месяцами для переданного года
 */
export function generateMonths(year: Date, options: { minMonth?: Date; maxMonth?: Date }) {
    return eachMonthOfInterval({ start: startOfYear(year), end: endOfYear(year) }).map((month) =>
        buildMonth(month, options),
    );
}

/**
 * Возвращает массив лет от minYear до maxYear
 */
export function generateYears(minYear: Date, maxYear: Date) {
    return eachYearOfInterval({
        start: min([startOfYear(maxYear), startOfYear(minYear)]),
        end: max([startOfYear(maxYear), startOfYear(minYear)]),
    }).reverse();
}

/**
 * Добавляет метаданные для переданного дня
 */
export function buildDay(
    day: Date,
    options: {
        minDate?: Date;
        maxDate?: Date;
        selected?: Date;
        eventsMap?: SpecialDays;
        offDaysMap?: SpecialDays;
        holidaysMap?: SpecialDays;
        dayAddonsMap?: SpecialDaysAddon;
    },
): Day {
    const {
        minDate,
        maxDate,
        selected,
        eventsMap = {},
        offDaysMap = {},
        holidaysMap = {},
        dayAddonsMap = {},
    } = options;
    const off = offDaysMap[day.getTime()];
    const disabled = (minDate && isBefore(day, minDate)) || (maxDate && isAfter(day, maxDate));

    return {
        date: day,
        disabled: disabled || off,
        event: eventsMap[day.getTime()],
        holiday: holidaysMap[day.getTime()],
        selected: selected && isSameDay(day, selected),
        dayAddon: dayAddonsMap[day.getTime()],
    };
}

/**
 * Добавляет метаданные для переданного месяца
 */
export function buildMonth(month: Date, options: { minMonth?: Date; maxMonth?: Date }): Month {
    const { minMonth, maxMonth } = options;

    return {
        date: month,
        disabled: (minMonth && isBefore(month, minMonth)) || (maxMonth && isAfter(month, maxMonth)),
    };
}

/**
 * Ограничивает дату на отрезке [minDate, maxDate]
 */
export function limitDate(date: Date | number, minDate?: Date | number, maxDate?: Date | number) {
    let limitedDate = date;

    if (minDate) limitedDate = max([startOfDay(minDate), limitedDate]);
    if (maxDate) limitedDate = min([endOfDay(maxDate), limitedDate]);

    return new Date(limitedDate);
}

/**
 * Проверяет, находится ли переданная дата в указанных границах
 */
export function dateInLimits(
    date?: Date | number | null,
    minDate?: Date | number,
    maxDate?: Date | number,
) {
    return date && limitDate(date, minDate, maxDate).getTime() === new Date(date).getTime();
}

/**
 * Возвращает русское название месяца с большой буквы
 */
export function monthName(month: Date) {
    return MONTHS[month.getMonth()];
}

/**
 * Превращает массив в объект, у которого ключи составляются из элементов массива
 */
export function dateArrayToHashTable(arr: Array<Date | number>) {
    return arr.reduce((acc: Record<number, boolean>, v) => {
        acc[startOfDay(v).getTime()] = true;

        return acc;
    }, {});
}

export function addonArrayToHashTable(arr: DayAddons[]) {
    return arr.reduce((acc: Record<number, ReactNode>, v) => {
        acc[startOfDay(v.date).getTime()] = v.addon;

        return acc;
    }, {});
}

/**
 * Возвращает корректный отрезок дат для выделения
 */
export function getSelectionRange(
    from?: Date | number,
    to?: Date | number,
    highlighted?: Date | number,
) {
    if (!from && !to) return null;

    const end = to || highlighted;
    const start = from || highlighted;

    if (start && end && start !== end) {
        return {
            start: startOfDay(min([start, end])),
            end: startOfDay(max([start, end])),
        };
    }

    return null;
}

// Меняет дату одним из способов с учетом границ и выходных дней
export function modifyDateByShift(
    shift: DateShift,
    date: Date,
    minDate?: Date,
    maxDate?: Date,
    offDaysMap: Record<number, boolean> = {},
) {
    const modifiers: Record<DateShift, () => Date> = {
        prev: () => subDays(date, 1),
        prevWeek: () => subDays(date, 7),
        prevMonth: () => subMonths(date, 1),
        next: () => addDays(date, 1),
        nextWeek: () => addDays(date, 7),
        nextMonth: () => addMonths(date, 1),
        startOfWeek: () => startOfWeek(date, { weekStartsOn: 1 }),
        endOfWeek: () => startOfDay(endOfWeek(date, { weekStartsOn: 1 })),
    };

    let newDate = modifiers[shift]();

    while (offDaysMap[newDate.getTime()]) {
        // Перескакиваем через выходные дни, кроме случаев с концами недели
        let amount = newDate < date ? -1 : 1;

        if (shift === 'endOfWeek') amount = -1;
        if (shift === 'startOfWeek') amount = 1;
        newDate = addDays(newDate, amount);
    }

    return limitDate(newDate, minDate, maxDate);
}

/**
 * Если дата была выбрана мышкой — фокусную обводку не видно
 * TODO: добавить в useFocus возможность переключать метод ввода программно
 */
export function simulateTab(node: HTMLElement) {
    if (window.KeyboardEvent) {
        const event = new window.KeyboardEvent('keydown', {
            bubbles: true,
            key: 'Tab',
        });

        node.dispatchEvent(event);
    }
}

export const formatDate = (date: Date | number, dateFormat = DATE_FORMAT) =>
    format(date, dateFormat);

export const parseDateString = (value: string, dateFormat = DATE_FORMAT) =>
    parse(value, dateFormat, new Date());

export function getCalendarMobileTestIds(dataTestId: string) {
    return {
        calendar: dataTestId,
        content: getDataTestId(dataTestId, 'content'),
        footer: getDataTestId(dataTestId, 'footer'),
        header: getDataTestId(dataTestId, 'header'),
        closer: getDataTestId(dataTestId, 'header-closer'),
        btnApply: getDataTestId(dataTestId, 'btn-apply'),
        btnReset: getDataTestId(dataTestId, 'btn-reset'),
        btnNextDate: getDataTestId(dataTestId, 'slider-btn-next-day'),
        btnPreviousDate: getDataTestId(dataTestId, 'slider-btn-previous-day'),
    };
}

export function isRangeValue(
    value: CalendarProps['value'],
): value is { dateFrom?: number | undefined; dateTo?: number | undefined } {
    return Boolean(value) && typeof value === 'object';
}

export const getMonthStartTimestamp = (date: Date) => startOfMonth(date).getTime();

export const getMonthEndTimestamp = (date: Date) =>
    isThisMonth(date) ? startOfDay(new Date()).getTime() : lastDayOfMonth(date).getTime();
