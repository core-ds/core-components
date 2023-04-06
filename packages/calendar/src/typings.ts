export type SpecialDays = Record<number, boolean>;

export type Day = {
    date: Date;

    disabled?: boolean;

    event?: boolean;

    selected?: boolean;

    holiday?: boolean;

    bottomAddon?: DayAddon;
};

export type Month = {
    date: Date;

    disabled?: boolean;
};

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

export type BottonAddon = {
    date: Date;
    addon: number | string;
    color?: boolean;
};

export type DayAddon = Omit<BottonAddon, 'date'>;

export type SpecialDaysAddon = Record<number, DayAddon>;
