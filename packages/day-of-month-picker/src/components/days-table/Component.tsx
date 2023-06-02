import React, { FC, RefCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cn from 'classnames';

import { Button } from '@alfalab/core-components-button';

import styles from './index.module.css';

const DAYS_OF_MONTH = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30],
];

export type DaysTableProps = {
    /**
     * Доп. пропсы для переданного дня
     */
    getDayProps: (day: number) => Record<string, unknown> & {
        ref: RefCallback<HTMLTableCellElement>;
        onClick: (e: number) => void;
        selected: boolean;
    };

    /**
     * Должен ли календарь подстраиваться под ширину родителя.
     */
    responsive?: boolean;

    /**
     * Подсвеченный день (ховер)
     */
    highlighted?: number;
};

export const DaysTable: FC<DaysTableProps> = ({ getDayProps, responsive, highlighted }) => {
    const renderDay = (day: number, dayIdx: number) => {
        if (!day) return <td key={dayIdx} />;

        const { onClick, selected, ...props } = getDayProps(day);
        const dayHighlighted = day === highlighted;

        const handleDayClick = (e: number) => {
            onClick(e);
        };

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <td
                {...props}
                key={day}
                className={cn(styles.dayWrapper)}
                align='center'
                onClick={() => handleDayClick(day)}
            >
                <Button
                    type='button'
                    view='ghost'
                    size='xs'
                    className={cn(styles.day, {
                        [styles.selected]: selected,
                        [styles.highlighted]: dayHighlighted,
                    })}
                >
                    <span className={cn(styles.dayContent)}>{day}</span>
                </Button>
            </td>
        );
    };

    const renderWeek = (week: number[]) => <tr key={week[0]}>{week.map(renderDay)}</tr>;

    return (
        <table
            className={cn(styles.daysTable, {
                [styles.responsive]: responsive,
            })}
        >
            <TransitionGroup component={null}>
                <CSSTransition
                    timeout={300}
                    classNames={{
                        enter: styles.daysEnter,
                        enterActive: styles.daysEnterActive,
                        exit: styles.daysExit,
                    }}
                >
                    <tbody>{DAYS_OF_MONTH.map(renderWeek)}</tbody>
                </CSSTransition>
            </TransitionGroup>
        </table>
    );
};
