import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import endOfDay from 'date-fns/endOfDay';
import { ModalResponsive } from '@alfalab/core-components-modal';
import { Button } from '@alfalab/core-components-button';

import { Calendar, CalendarProps, limitDate, monthName, useCalendar, WEEKDAYS } from '../..';
import { DaysTable } from '../days-table';
import { generateId } from './utils';
import { generateMonths, generateWeeks } from '../../utils';

import styles from './index.module.css';

export type CalendarMobileProps = CalendarProps & {
    /**
     * Управление видимостью модалки
     */
    open: boolean;

    /**
     * Обработчик закрытия модалки
     */
    onClose?: () => void;

    /**
     * Заголовок календаря
     */
    title?: string;

    /**
     * Обработчик выбора даты
     */
    onChange?: (date?: number) => void;
};

const MODAL_HEADER_HEIGHT = 48;
const CALENDAR_HEADER_HEIGHT = 32;
const CALENDAR_OFFSET = 46;
const CALENDAR_MONTH_HEIGHT = 320;

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

        const scrollToCurrentMonth = useCallback(() => {
            const currentDate = new Date();
            const currentMonthNode = document.querySelector(`#${generateId(currentDate)}`);

            if (currentMonthNode) {
                const currentMonthNodePosY = currentMonthNode.getBoundingClientRect().y;

                if (modalRef.current) {
                    modalRef.current.scrollTo({
                        top:
                            currentMonthNodePosY -
                            (MODAL_HEADER_HEIGHT + CALENDAR_HEADER_HEIGHT + CALENDAR_OFFSET),
                    });
                }
            }
        }, []);

        const extendCalendarPeriod = useCallback(
            (side: 'start' | 'end') => {
                const monthIndex = side === 'start' ? 0 : activeMonths.length - 1;
                const shift = side === 'start' ? -1 : 1;

                const scrolledMonth = activeMonths[monthIndex].date;
                const scrolledMonthNode = document.querySelector(`#${generateId(scrolledMonth)}`);

                if (scrolledMonthNode) {
                    const year = new Date().setFullYear(scrolledMonth.getFullYear() + shift);
                    const yearMonths = generateMonths(new Date(year), {});

                    setActiveMonths(prevState =>
                        side === 'start'
                            ? [...yearMonths, ...prevState]
                            : [...prevState, ...yearMonths],
                    );
                }
            },
            [activeMonths],
        );

        useEffect(() => {
            if (open && monthOnlyView) {
                setTimeout(scrollToCurrentMonth, 0);
            }
        }, [open, monthOnlyView, scrollToCurrentMonth]);

        useEffect(() => {
            const elem = modalRef.current;

            if (!elem) return undefined;

            const handleScroll = () => {
                if (elem.scrollTop <= CALENDAR_MONTH_HEIGHT + CALENDAR_HEADER_HEIGHT) {
                    extendCalendarPeriod('start');

                    if (activeMonths.length >= 36) {
                        setActiveMonths(prevState =>
                            [...prevState].slice(0, activeMonths.length - 12),
                        );
                    }

                    if (modalRef.current) {
                        modalRef.current.scrollTo({
                            top:
                                CALENDAR_MONTH_HEIGHT * 12 -
                                (MODAL_HEADER_HEIGHT + CALENDAR_HEADER_HEIGHT + CALENDAR_OFFSET),
                        });
                    }
                } else if (elem.scrollHeight - elem.scrollTop <= 2 * CALENDAR_MONTH_HEIGHT) {
                    extendCalendarPeriod('end');

                    if (activeMonths.length >= 36) {
                        setActiveMonths(prevState => [...prevState].slice(12));
                    }
                }
            };

            elem.addEventListener('scroll', handleScroll);

            return () => {
                elem.removeEventListener('scroll', handleScroll);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [modalRef.current, activeMonths, selectedFrom, selectedTo, extendCalendarPeriod]);

        const handleClose = useCallback(() => {
            if (onClose) onClose();

            setActiveMonths(months);
        }, [months, onClose]);

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

        return (
            <div className={className} ref={ref}>
                <ModalResponsive
                    open={open}
                    onClose={handleClose}
                    dataTestId={dataTestId}
                    ref={modalRef}
                >
                    <ModalResponsive.Header
                        hasCloser={true}
                        title={title}
                        align='center'
                        leftAddons={<div />}
                        sticky={true}
                        className={styles.modalHeader}
                    />
                    {monthOnlyView && renderHeader()}
                    <ModalResponsive.Content flex={true}>
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
                    </ModalResponsive.Content>
                    <ModalResponsive.Footer sticky={true} className={styles.modalFooter}>
                        {value || selectedFrom || selectedTo ? (
                            <Button view='primary' size='s' block={true} onClick={handleClose}>
                                Выбрать
                            </Button>
                        ) : (
                            <Button view='secondary' size='s' block={true} onClick={handleClose}>
                                Отмена
                            </Button>
                        )}
                    </ModalResponsive.Footer>
                </ModalResponsive>
            </div>
        );
    },
);
