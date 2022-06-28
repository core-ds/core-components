import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import isSameMonth from 'date-fns/isSameMonth';
import isThisMonth from 'date-fns/isThisMonth';
import { SelectButton, SelectButtonProps } from '../select-button';
import { monthName } from '../../utils';
import { Month } from '../../typings';

import styles from './index.module.css';

export type MonthsTableProps = {
    /**
     * Массив месяцев
     */
    months?: Month[];

    /**
     * Выбранный месяц
     */
    selectedMonth?: Date;

    /**
     * Доп пропсы для переданного месяца
     */
    getMonthProps: (day: Month) => Record<string, unknown>;

    /**
     * Используется ли мобильная версия календаря
     */
    mobile?: boolean;
};

export const MonthsTable: FC<MonthsTableProps> = ({
    selectedMonth,
    months = [],
    getMonthProps,
    mobile,
}) => {
    const view = useCallback(
        (month: Month): SelectButtonProps['view'] => {
            if (selectedMonth && isSameMonth(selectedMonth, month.date)) return 'selected';
            if (isThisMonth(month.date)) return 'outlined';
            return 'default';
        },
        [selectedMonth],
    );

    return (
        <div className={cn(styles.monthsTable, { [styles.mobile]: mobile })}>
            {months.map(month => (
                <SelectButton
                    {...getMonthProps(month)}
                    key={month.date.getTime()}
                    className={styles.button}
                    view={view(month)}
                >
                    {monthName(month.date)}
                </SelectButton>
            ))}
        </div>
    );
};
