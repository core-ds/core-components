import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import endOfDay from 'date-fns/endOfDay';
import { ModalMobile } from '@alfalab/core-components-modal';
import { Button } from '@alfalab/core-components-button';

import { Calendar, CalendarProps, limitDate, monthName, useCalendar, WEEKDAYS } from '../..';
import { DaysTable } from '../days-table';
import { generateId } from './utils';
import { generateMonths, generateWeeks } from '../../utils';

import styles from './index.module.css';

type Side = 'start' | 'end';

export type CalendarMobileProps = CalendarProps & {
    /**
     * Управление видимостью модалки
     */
    open: boolean;

    /**
     * Заголовок календаря
     */
    title?: string;

    /**
     * Обработчик закрытия модалки
     */
    onClose?: () => void;
};

const MODAL_HEADER_HEIGHT = 48;
const CALENDAR_HEADER_HEIGHT = 32;
const CALENDAR_OFFSET = 46;
const MONTH_OFFSET = 27;
const LAST_MONTH_SCROLL_TOP = 2965;

export const CalendarMobile = forwardRef<HTMLDivElement, CalendarMobileProps>(
    (
        {
            className,
            defaultView = 'days',
            selectorView = 'full',
            value,
            month: monthTimestamp,
            minDate: minDateTimestamp,
            maxDate: maxDateTimestamp,
            defaultMonth: defaultMonthTimestamp = +new Date(),
            selectedFrom,
            selectedTo,
            rangeComplete,
            offDays,
            events,
            onChange,
            onMonthChange,
            onMonthClick,
            onYearClick,
            dataTestId,
            open,
            onClose,
            title = 'Календарь',
        },
        ref,
    ) => {
        const modalRef = useRef<HTMLDivElement>(null);

        const monthOnlyView = useMemo(() => selectorView === 'month-only', [selectorView]);

        const month = useMemo(() => (monthTimestamp ? new Date(monthTimestamp) : undefined), [
            monthTimestamp,
        ]);

        const minDate = useMemo(
            () => (minDateTimestamp ? startOfDay(minDateTimestamp) : undefined),
            [minDateTimestamp],
        );

        const maxDate = useMemo(() => (maxDateTimestamp ? endOfDay(maxDateTimestamp) : undefined), [
            maxDateTimestamp,
        ]);

        const selected = useMemo(() => (value ? new Date(value) : undefined), [value]);

        const defaultMonth = useMemo(
            () =>
                startOfMonth(
                    selected ||
                        limitDate(defaultMonthTimestamp, minDateTimestamp, maxDateTimestamp),
                ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [],
        );

        const { activeMonth, months, highlighted, getDayProps } = useCalendar({
            month,
            defaultMonth,
            view: defaultView,
            minDate,
            maxDate,
            selected,
            offDays,
            events,
            onChange,
            onMonthChange,
        });

        const [activeMonths, setActiveMonths] = useState(months);
        const [firstMonth, setFirstMonth] = useState<Element | null>(null);
        const [lastMonth, setLastMonth] = useState<Element | null>(null);

        const scrollToInitialMonth = useCallback(() => {
            const currentDate = new Date();
            const currentMonthNode = document.querySelector(`#${generateId(currentDate)}`);

            if (currentMonthNode && modalRef.current) {
                const currentMonthNodePosY = currentMonthNode.getBoundingClientRect().y;
                const monthOffset = MODAL_HEADER_HEIGHT + CALENDAR_HEADER_HEIGHT + CALENDAR_OFFSET;

                modalRef.current.scrollTo({
                    top: currentMonthNodePosY - monthOffset,
                });
            }
        }, []);

        const extendCalendarPeriod = useCallback((side: Side) => {
            setActiveMonths(prevState => {
                const monthIndex = side === 'start' ? 0 : prevState.length - 1;
                const shift = side === 'start' ? -1 : 1;

                const scrolledMonth = prevState[monthIndex].date;
                const scrolledMonthNode = document.querySelector(`#${generateId(scrolledMonth)}`);

                if (scrolledMonthNode) {
                    const year = new Date().setFullYear(scrolledMonth.getFullYear() + shift);
                    const yearMonths = generateMonths(new Date(year), {});

                    return side === 'start'
                        ? [...yearMonths, ...prevState]
                        : [...prevState, ...yearMonths];
                }

                return prevState;
            });
        }, []);

        const reduceCalendarPeriod = useCallback((side: Side) => {
            setActiveMonths(prevState => {
                if (prevState.length >= 36) {
                    return side === 'start'
                        ? [...prevState].slice(0, prevState.length - 12)
                        : [...prevState].slice(12);
                }

                return prevState;
            });
        }, []);

        const updateCalendarPeriod = useCallback(
            (side: Side) => {
                extendCalendarPeriod(side);
                reduceCalendarPeriod(side);
            },
            [extendCalendarPeriod, reduceCalendarPeriod],
        );

        // eslint-disable-next-line consistent-return
        const handleScroll = useCallback(() => {
            const elem = modalRef.current;

            if (!elem) return false;

            const monthList = elem.querySelector('div[class*="daysTable"]')?.parentNode;

            if (!monthList) return false;

            if (elem.scrollTop === 0) {
                setFirstMonth(monthList.firstElementChild);
                updateCalendarPeriod('start');
            }

            if (elem.scrollTop + elem.clientHeight === elem.scrollHeight) {
                setLastMonth(monthList.lastElementChild);
                updateCalendarPeriod('end');
            }
        }, [updateCalendarPeriod]);

        const handleClose = useCallback(() => {
            if (onClose) onClose();
        }, [onClose]);

        const handleClear = useCallback(() => {
            if (onChange) onChange();
        }, [onChange]);

        const handleMount = useCallback(() => {
            if (modalRef.current) {
                modalRef.current.addEventListener('scroll', handleScroll);
            }
        }, [handleScroll]);

        const handleUnmount = useCallback(() => {
            if (modalRef.current) {
                modalRef.current.removeEventListener('scroll', handleScroll);
            }

            setActiveMonths(months);
        }, [months, handleScroll]);

        useEffect(() => {
            if (open) {
                setTimeout(scrollToInitialMonth, 0);
            }
        }, [open, scrollToInitialMonth]);

        useEffect(() => {
            const elem = modalRef.current;

            if (!elem) return;

            if (firstMonth) {
                const firstMonthOffset =
                    CALENDAR_HEADER_HEIGHT + MODAL_HEADER_HEIGHT + MONTH_OFFSET;
                const firstMonthPosY = firstMonth.getBoundingClientRect().y;

                elem.scrollTo({
                    top: firstMonthPosY - firstMonthOffset,
                });

                setFirstMonth(null);
            } else if (lastMonth) {
                elem.scrollTo({
                    top: LAST_MONTH_SCROLL_TOP,
                });

                setLastMonth(null);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [activeMonths]);

        const renderHeader = useCallback(
            () => (
                <table className={styles.calendarHeader}>
                    <thead>
                        <tr>
                            {WEEKDAYS.map(dayName => (
                                <th className={styles.dayName} key={dayName}>
                                    {dayName}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
            ),
            [],
        );

        const renderFooter = useCallback(() => {
            if (selectedFrom || selectedTo) {
                return (
                    <>
                        <Button
                            view='primary'
                            size='s'
                            block={true}
                            onClick={handleClose}
                            disabled={!selectedFrom || !selectedTo}
                        >
                            Выбрать
                        </Button>
                        <Button view='secondary' size='s' block={true} onClick={handleClear}>
                            Сбросить
                        </Button>
                    </>
                );
            }

            if (value) {
                return (
                    <Button view='primary' size='s' block={true} onClick={handleClose}>
                        Выбрать
                    </Button>
                );
            }

            return (
                <Button view='secondary' size='s' block={true} onClick={handleClose}>
                    Отмена
                </Button>
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value, selectedFrom, selectedTo]);

        return (
            <div className={className} ref={ref}>
                <ModalMobile
                    open={open}
                    onClose={handleClose}
                    dataTestId={dataTestId}
                    ref={modalRef}
                    onMount={handleMount}
                    onUnmount={handleUnmount}
                >
                    <ModalMobile.Header
                        hasCloser={true}
                        title={title}
                        align='center'
                        leftAddons={<div />}
                        sticky={true}
                        className={styles.modalHeader}
                    />
                    {monthOnlyView && renderHeader()}
                    <ModalMobile.Content flex={true}>
                        {monthOnlyView ? (
                            activeMonths.map(month => (
                                <div
                                    className={styles.daysTable}
                                    id={generateId(month.date)}
                                    key={generateId(month.date)}
                                >
                                    <span className={styles.month}>{`${monthName(
                                        month.date,
                                    )} ${month.date.getFullYear()}`}</span>
                                    <DaysTable
                                        weeks={generateWeeks(month.date, {
                                            minDate,
                                            maxDate,
                                            selected,
                                        })}
                                        activeMonth={activeMonth}
                                        selectedFrom={selectedFrom}
                                        selectedTo={selectedTo}
                                        getDayProps={getDayProps}
                                        highlighted={highlighted}
                                        rangeComplete={rangeComplete}
                                        hasHeader={false}
                                    />
                                </div>
                            ))
                        ) : (
                            <Calendar
                                value={value}
                                onChange={onChange}
                                offDays={offDays}
                                events={events}
                                defaultView={defaultView}
                                selectorView={selectorView}
                                className={styles.calendar}
                                onMonthClick={onMonthClick}
                                onYearClick={onYearClick}
                                selectedFrom={selectedFrom}
                                selectedTo={selectedTo}
                            />
                        )}
                    </ModalMobile.Content>
                    <ModalMobile.Footer sticky={true} className={styles.modalFooter}>
                        {renderFooter()}
                    </ModalMobile.Footer>
                </ModalMobile>
            </div>
        );
    },
);
