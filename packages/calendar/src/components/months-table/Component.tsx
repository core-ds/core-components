import React, { type FC, useCallback } from 'react';
import cn from 'classnames';
import { isSameMonth, isThisMonth } from 'date-fns';

import { type Month } from '../../typings';
import { monthName } from '../../utils';
import { SelectButton, type SelectButtonProps } from '../select-button';

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
     * Должен ли календарь подстраиваться под ширину родителя.
     */
    responsive?: boolean;
};

export const MonthsTable: FC<MonthsTableProps> = ({
    selectedMonth,
    months = [],
    getMonthProps,
    responsive,
}) => {
    const view = useCallback(
        (month: Month): SelectButtonProps['view'] => {
            if (selectedMonth && isSameMonth(selectedMonth, month.date)) return 'selected';
            if (isThisMonth(month.date)) return 'current';

            return 'default';
        },
        [selectedMonth],
    );

    return (
        <div className={cn(styles.monthsTable, { [styles.responsive]: responsive })}>
            {months.map((month) => (
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
