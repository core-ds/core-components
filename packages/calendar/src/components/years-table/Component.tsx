import React, { FC } from 'react';
import cn from 'classnames';
import { isSameYear, isThisYear } from 'date-fns';

import { SelectButton, SelectButtonProps } from '../select-button';

import styles from './index.module.css';

export type YearsTableProps = {
    /**
     * Массив лет
     */
    years?: Date[];

    /**
     * Выбранный год
     */
    selectedYear?: Date;

    /**
     * Доп. пропсы для переданного года
     */
    getYearProps: (year: Date) => Record<string, unknown>;

    /**
     * Должен ли календарь подстраиваться под ширину родителя.
     */
    responsive?: boolean;
};

export const YearsTable: FC<YearsTableProps> = ({
    selectedYear,
    years = [],
    getYearProps,
    responsive,
}) => {
    const view = (year: Date): SelectButtonProps['view'] => {
        if (selectedYear && isSameYear(selectedYear, year)) return 'selected';
        if (isThisYear(year)) return 'current';

        return 'default';
    };

    return (
        <div className={cn(styles.yearsTable, { [styles.responsive]: responsive })}>
            <div className={styles.inner}>
                {years.map((year) => (
                    <SelectButton
                        {...getYearProps(year)}
                        key={year.getFullYear()}
                        view={view(year)}
                        className={styles.button}
                    >
                        {year.getFullYear()}
                    </SelectButton>
                ))}
            </div>
        </div>
    );
};
