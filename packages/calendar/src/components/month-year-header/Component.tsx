import React, { FC, MouseEvent } from 'react';
import cn from 'classnames';

import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';

import { monthName } from '../../utils';
import { SelectButton } from '../select-button';

import styles from './index.module.css';
import mobileStyles from './mobile.module.css';

export type MonthYearHeaderProps = {
    /**
     * Активная дата
     */
    value?: Date;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Обработчик нажатия на кнопку месяца
     */
    onMonthClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик нажатия на кнопку года
     */
    onYearClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Мобильная версия компонента
     */
    mobile?: boolean;
};

export const MonthYearHeader: FC<MonthYearHeaderProps> = ({
    value,
    className,
    onMonthClick,
    onYearClick,
    dataTestId,
    mobile,
}) => {
    const month = value ? monthName(value) : undefined;
    const year = value ? value.getFullYear().toString() : undefined;

    return (
        <div
            className={cn(styles.component, className, {
                [mobileStyles.component]: mobile,
            })}
            aria-live='polite'
            data-test-id={dataTestId}
        >
            <SelectButton
                view='filled'
                className={cn(styles.button, styles.month, {
                    [mobileStyles.button]: mobile,
                })}
                onClick={onMonthClick}
            >
                <span className={styles.buttonContent}>
                    {month}
                    <ChevronDownCompactSIcon className={styles.upDownIcon} />
                </span>
            </SelectButton>
            <SelectButton
                view='filled'
                className={cn(styles.button, styles.year, {
                    [mobileStyles.button]: mobile,
                })}
                onClick={onYearClick}
            >
                <span className={styles.buttonContent}>
                    {year}
                    <ChevronDownCompactSIcon className={styles.upDownIcon} />
                </span>
            </SelectButton>
        </div>
    );
};
