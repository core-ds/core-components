import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { Virtuoso } from 'react-virtuoso';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import endOfDay from 'date-fns/endOfDay';
import { ModalMobile } from '@alfalab/core-components-modal/mobile';
import { Button } from '@alfalab/core-components-button';

import { Calendar, CalendarProps, limitDate, monthName, useCalendar, WEEKDAYS } from '../..';
import { DaysTable } from '../days-table';
import { generateMonths, generateWeeks } from '../../utils';
import { Month } from '../../typings';

import styles from './index.module.css';

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

    /**
     * Количество лет для генерации в обе стороны от текущего года
     */
    yearsAmount?: number;
};

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
            yearsAmount = 10,
        },
        ref,
    ) => {
        const modalRef = useRef<HTMLDivElement>(null);

        const initialMonthIndex = useMemo(() => {
            const currentMonthIndex = new Date().getMonth();
            return yearsAmount * 12 + currentMonthIndex;
        }, [yearsAmount]);

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

        const generateInitialMonths = useCallback(() => {
            const prevMonths: Month[] = [];
            const nextMonths: Month[] = [];

            for (let i = 0; i < yearsAmount; i++) {
                const prevYear = new Date().setFullYear(new Date().getFullYear() - (i + 1));
                const nextYear = new Date().setFullYear(new Date().getFullYear() + (i + 1));

                const prevYearMonths = generateMonths(new Date(prevYear), {});
                const nextYearMonths = generateMonths(new Date(nextYear), {});

                prevMonths.unshift(...prevYearMonths);
                nextMonths.push(...nextYearMonths);
            }

            setActiveMonths(prevState => [...prevMonths, ...prevState, ...nextMonths]);
        }, [yearsAmount]);

        const handleClose = useCallback(() => {
            if (onClose) onClose();
        }, [onClose]);

        const handleClear = useCallback(() => {
            if (onChange) onChange();
        }, [onChange]);

        useEffect(() => {
            generateInitialMonths();
        }, [generateInitialMonths]);

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

        const renderMonth = useCallback(
            (index: number, key: number | string) => {
                return (
                    <div className={styles.daysTable} id={`month-${index}`} key={key}>
                        <span className={styles.month}>{`${monthName(
                            activeMonths[index].date,
                        )} ${activeMonths[index].date.getFullYear()}`}</span>
                        <DaysTable
                            weeks={generateWeeks(activeMonths[index].date, {
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
                );
            },
            [
                activeMonths,
                minDate,
                maxDate,
                selected,
                activeMonth,
                selectedFrom,
                selectedTo,
                getDayProps,
                highlighted,
                rangeComplete,
            ],
        );

        const renderContent = useCallback(() => {
            if (monthOnlyView) {
                return (
                    <Virtuoso
                        totalCount={activeMonths.length}
                        itemContent={renderMonth}
                        initialTopMostItemIndex={initialMonthIndex}
                        overscan={{ main: 244 * 6, reverse: 244 * 6 }}
                        itemSize={(el) => el.getBoundingClientRect().height + 32}
                    />
                );
            }

            return (
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
            );
        }, [
            monthOnlyView,
            activeMonths,
            selectedFrom,
            selectedTo,
            value,
            onChange,
            offDays,
            events,
            defaultView,
            selectorView,
            onMonthClick,
            onYearClick,
            renderMonth,
            initialMonthIndex,
        ]);

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
        }, [value, selectedFrom, selectedTo, handleClose, handleClear]);

        return (
            <div className={cn(className, styles.component)} ref={ref} data-test-id={dataTestId}>
                <ModalMobile
                    open={open}
                    onClose={handleClose}
                    ref={modalRef}
                    className={styles.modal}
                    wrapperClassName={styles.wrapper}
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
                    <ModalMobile.Content flex={true} className={styles.modalContent}>
                        {renderContent()}
                    </ModalMobile.Content>
                    <ModalMobile.Footer sticky={true} className={styles.modalFooter}>
                        {renderFooter()}
                    </ModalMobile.Footer>
                </ModalMobile>
            </div>
        );
    },
);
