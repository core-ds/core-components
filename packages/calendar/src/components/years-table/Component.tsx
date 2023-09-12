import React, { FC, MouseEvent, useCallback, useRef } from 'react';
import cn from 'classnames';
import isSameYear from 'date-fns/isSameYear';
import isThisYear from 'date-fns/isThisYear';

import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';

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
     * Обработчик скролла
     */
    onScroll: (scrollTop: number) => void;

    /**
     * Должен ли календарь подстраиваться под ширину родителя.
     */
    responsive?: boolean;
};

export const YearsTable: FC<YearsTableProps> = ({
    selectedYear,
    years = [],
    getYearProps,
    onScroll,
    responsive,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const view = useCallback(
        (year: Date): SelectButtonProps['view'] => {
            if (selectedYear && isSameYear(selectedYear, year)) return 'selected';
            if (isThisYear(year)) return 'outlined';

            return 'default';
        },
        [selectedYear],
    );

    const handleScroll = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            onScroll(event.currentTarget.scrollTop);
        },
        [onScroll],
    );

    useLayoutEffect_SAFE_FOR_SSR(() => {
        const listNode = ref.current;
        const selector = `.${styles.button}[tabIndex="0"]`;
        const selectedYearNode = listNode && listNode.querySelector<HTMLButtonElement>(selector);

        if (listNode && selectedYearNode) {
            const topIndent = listNode.clientHeight / 2 - selectedYearNode.clientHeight / 2;

            listNode.scrollTop = selectedYearNode.offsetTop - topIndent;

            onScroll(listNode.scrollTop);
        }
    }, [onScroll, selectedYear]);

    return (
        <div
            className={cn(styles.yearsTable, { [styles.responsive]: responsive })}
            onScroll={handleScroll}
            ref={ref}
        >
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
