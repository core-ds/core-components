import React, { FC, MouseEvent, useCallback } from 'react';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';
import { Typography } from '@alfalab/core-components-typography';

import styles from './index.module.css';

const DAYS_OF_MONTH = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30],
];

const LAST_DAY = 31;

export type DaysTableProps = {
    onClick: (day: number) => void;
    selectedDay: number;
};

export const DaysTable: FC<DaysTableProps> = ({ onClick, selectedDay }) => {
    const handleMouseDown = useCallback((event: MouseEvent<HTMLElement>) => {
        // Не дает терять фокус при выборе дня
        event.preventDefault();
    }, []);
    const renderDay = (day: number) => (
        // eslint-disable-next-line jsx-a11y/role-supports-aria-props
        <td
            key={day}
            align='center'
            onClick={() => onClick(day)}
            role='presentation'
            aria-selected={selectedDay === day}
            data-day={day}
            onMouseDown={handleMouseDown}
        >
            <Button
                type='button'
                view='ghost'
                size='xs'
                className={cn(styles.day, {
                    [styles.highlighted]: selectedDay === day,
                })}
            >
                <span className={cn(styles.dayContent)}>{day}</span>
            </Button>
        </td>
    );

    const renderLastDay = () => {
        const isLastDay = selectedDay === LAST_DAY;
        const handleClick = () => {
            onClick(LAST_DAY);
        };

        return (
            <Button
                dataTestId='last-day-button'
                type='button'
                view='ghost'
                size='xs'
                className={cn(styles.lastDay, {
                    [styles.highlighted]: isLastDay,
                })}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
            >
                <Typography.Text color={`${isLastDay ? 'primary-inverted' : 'primary'}`}>
                    В последний день месяца
                </Typography.Text>
            </Button>
        );
    };

    return (
        <React.Fragment>
            <table className={styles.daysTable}>
                <tbody>
                    {DAYS_OF_MONTH.map((week) => (
                        <tr key={week[0]}>{week.map(renderDay)}</tr>
                    ))}
                </tbody>
            </table>
            {renderLastDay()}
        </React.Fragment>
    );
};
