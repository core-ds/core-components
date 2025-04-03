import { ReactNode } from 'react';

import { generateWeeks } from './utils';

export type SpecialDays = Record<number, boolean>;

export type DayAddons = {
    date: Date | number;
    addon: ReactNode;
};

export type SpecialDaysAddon = Record<number, ReactNode>;

export type Day = {
    date: Date;

    disabled?: boolean;

    event?: boolean;

    selected?: boolean;

    holiday?: boolean;

    dayAddon?: ReactNode;
};

export type Month = {
    date: Date;

    disabled?: boolean;
};

export interface ActiveMonths extends Month {
    weeks: ReturnType<typeof generateWeeks>;
    title: string;
}

export type DateShift =
    | 'prev'
    | 'prevWeek'
    | 'prevMonth'
    | 'startOfWeek'
    | 'next'
    | 'nextWeek'
    | 'nextMonth'
    | 'endOfWeek';

export type View = 'years' | 'months' | 'days';

export type SelectorView = 'month-only' | 'full';
