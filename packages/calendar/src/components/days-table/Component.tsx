/* eslint-disable complexity */
import React, { FC, RefCallback, useCallback, useRef } from 'react';
import cn from 'classnames';
import { Button } from '@alfalab/core-components-button';
import isEqual from 'date-fns/isEqual';
import isLastDayOfMonth from 'date-fns/isLastDayOfMonth';
import isSameDay from 'date-fns/isSameDay';
import isToday from 'date-fns/isToday';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfMonth from 'date-fns/startOfMonth';
import { usePrevious } from '@alfalab/hooks';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { WEEKDAYS, getSelectionRange, russianWeekDay } from '../../utils';
import { Day } from '../../typings';

import styles from './index.module.css';

export type DaysTableProps = {
    /**
     * Массив-календарь недель
     */
    weeks?: Day[][];

    /**
     * Активный месяц
     */
    activeMonth?: Date;

    /**
     * Начало выделенного периода
     */
    selectedFrom?: Date | number;

    /**
     * Конец выделенного периода
     */
    selectedTo?: Date | number;

    /**
     * Индикатор, что выбран полный период
     */
    rangeComplete?: boolean;

    /**
     * Подсвеченная дата (ховер)
     */
    highlighted?: Date | number;

    /**
     * Доп. пропсы для переданного дня
     */
    getDayProps: (
        day: Day,
    ) => Record<string, unknown> & {
        ref: RefCallback<HTMLTableDataCellElement>;
        onClick: (e: React.MouseEvent<HTMLTableDataCellElement>) => void;
    };

    /**
     * Нужно ли рендерить шапку
     */
    hasHeader?: boolean;
};

export const DaysTable: FC<DaysTableProps> = ({
    weeks = [],
    activeMonth = new Date(),
    highlighted,
    selectedFrom,
    selectedTo,
    rangeComplete = selectedFrom && selectedTo,
    getDayProps,
    hasHeader = true,
}) => {
    const activeMonthRef = useRef(activeMonth);

    activeMonthRef.current = activeMonth;

    const prevActiveMonth = usePrevious(activeMonth);

    const direction = prevActiveMonth && (activeMonth < prevActiveMonth ? 'right' : 'left');

    const selection = getSelectionRange(selectedFrom, selectedTo, highlighted);

    const renderHeader = useCallback(
        () =>
            WEEKDAYS.map(dayName => (
                <th className={styles.dayName} key={dayName}>
                    {dayName}
                </th>
            )),
        [],
    );

    const renderDay = (day: Day, dayIdx: number) => {
        if (!day) return <td key={dayIdx} />;

        const daySelected =
            day.selected ||
            (selectedFrom && isSameDay(day.date, selectedFrom)) ||
            (selectedTo && isSameDay(day.date, selectedTo));

        const dayHighlighted = highlighted && isEqual(day.date, highlighted);
        const inRange = selection && isWithinInterval(day.date, selection);

        const firstDayOfMonth = day.date.getDate() === 1;
        const lastDayOfMonth = isLastDayOfMonth(day.date);

        const firstDayOfWeek = russianWeekDay(day.date) === 0;
        const lastDayOfWeek = russianWeekDay(day.date) === 6;

        const transitLeft = firstDayOfMonth && inRange && selection && day.date > selection.start;
        const transitRight = lastDayOfMonth && inRange && selection && day.date < selection.end;

        const rangeStart = selection && isSameDay(day.date, selection.start);
        const rangeEnd = selection && isSameDay(day.date, selection.end);

        const sharpTransitLeft =
            firstDayOfWeek &&
            firstDayOfMonth &&
            inRange &&
            selection &&
            (isSameDay(day.date, selection.start) || isSameDay(day.date, selection.end));

        const sharpTransitRight =
            lastDayOfWeek &&
            lastDayOfMonth &&
            inRange &&
            selection &&
            (isSameDay(day.date, selection.start) || isSameDay(day.date, selection.end));

        const dayProps = getDayProps(day);

        const { onClick } = dayProps;

        const handleDayClick = (e: React.MouseEvent<HTMLTableDataCellElement>) => {
            if (!day.disabled) onClick(e);
        };

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <td
                {...dayProps}
                key={day.date.getTime()}
                className={cn(styles.dayWrapper, {
                    [styles.range]: inRange,
                    [styles.rangeComplete]: inRange && rangeComplete,
                    [styles.transitLeft]: transitLeft,
                    [styles.transitRight]: transitRight,
                    [styles.sharpTransitLeft]: sharpTransitLeft,
                    [styles.sharpTransitRight]: sharpTransitRight,
                    [styles.rangeStart]: rangeStart,
                    [styles.rangeEnd]: rangeEnd,
                })}
                align='center'
                ref={node => {
                    /**
                     * После анимации реф-коллбэк вызывается еще раз, и в него передается null и старый activeMonth.
                     * Поэтому приходится хранить актуальный месяц в рефе и сравнивать с ним.
                     */
                    if (startOfMonth(day.date).getTime() === activeMonthRef.current.getTime()) {
                        dayProps.ref(node as HTMLTableDataCellElement);
                    }
                }}
                onClick={handleDayClick}
            >
                <Button
                    type='button'
                    view='ghost'
                    size='xs'
                    disabled={day.disabled}
                    className={cn(styles.day, {
                        [styles.selected]: daySelected,
                        [styles.today]: isToday(day.date),
                        [styles.disabled]: day.disabled,
                        [styles.highlighted]: dayHighlighted,
                    })}
                >
                    {day.event && <span className={styles.dot} />}
                    {day.date.getDate()}
                </Button>
            </td>
        );
    };

    const renderWeek = (week: Day[], weekIdx: number) => (
        <tr key={weekIdx}>{week.map(renderDay)}</tr>
    );

    return (
        <table className={cn(styles.daysTable, direction && styles[direction])}>
            {hasHeader && (
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
            )}
            <TransitionGroup component={null}>
                <CSSTransition
                    key={activeMonth.getTime()}
                    timeout={250}
                    classNames={{
                        enter: styles.daysEnter,
                        enterActive: styles.daysEnterActive,
                        exit: styles.daysExit,
                        exitActive: styles.daysExitActive,
                    }}
                >
                    <tbody>{weeks.map(renderWeek)}</tbody>
                </CSSTransition>
            </TransitionGroup>
        </table>
    );
};
