import React, { forwardRef, useMemo, useRef } from 'react';
import cn from 'classnames';
import { Virtuoso } from 'react-virtuoso';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import endOfDay from 'date-fns/endOfDay';
import { ModalMobile } from '@alfalab/core-components-modal/mobile';
import { Button } from '@alfalab/core-components-button';

import { Calendar, CalendarProps, limitDate, monthName, useCalendar, WEEKDAYS } from '../..';
import { DaysTable } from '../days-table';
import { dateArrayToHashTable, generateMonths, generateWeeks } from '../../utils';
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

    /**
     * Нужно ли рендерить шапку
     */
    hasHeader?: boolean;

    /**
     * Разрешить выбор из недозаполненного диапазона дат.
     */
    allowSelectionFromEmptyRange?: boolean;
};

export const CalendarMobile = forwardRef<HTMLDivElement, CalendarMobileProps>(
    (
        {
            hasHeader = true,
            allowSelectionFromEmptyRange = false,
            className,
            defaultView = 'days',
            selectorView = 'full',
            value,
            selectedFrom,
            selectedTo,
            onChange,
            dataTestId,
            open,
            onClose,
            title = 'Календарь',
            yearsAmount = 3,
            ...restProps
        },
        ref,
    ) => {
        const modalRef = useRef<HTMLDivElement>(null);

        const monthOnlyView = selectorView === 'month-only';

        const handleClose = () => {
            if (onClose) onClose();
        };

        const handleClear = () => {
            if (onChange) onChange();
        };

        const renderDayNames = () => (
            <table className={styles.dayNames}>
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
        );

        const renderContent = () => {
            const commonProps = {
                value,
                onChange,
                defaultView,
                selectorView,
                selectedFrom,
                selectedTo,
            };

            if (monthOnlyView) {
                return (
                    <CalendarMonthOnlyView
                        open={open}
                        yearsAmount={yearsAmount}
                        {...commonProps}
                        {...restProps}
                    />
                );
            }

            return (
                <Calendar
                    responsive={true}
                    className={styles.calendar}
                    {...commonProps}
                    {...restProps}
                />
            );
        };

        const renderFooter = () => {
            if (selectedFrom || selectedTo) {
                let selectButtonDisabled = !selectedFrom || !selectedTo;

                if (allowSelectionFromEmptyRange) {
                    selectButtonDisabled = !selectedFrom;
                }

                return (
                    <React.Fragment>
                        <Button
                            view='primary'
                            size='s'
                            block={true}
                            onClick={handleClose}
                            disabled={selectButtonDisabled}
                        >
                            Выбрать
                        </Button>
                        <Button view='secondary' size='s' block={true} onClick={handleClear}>
                            Сбросить
                        </Button>
                    </React.Fragment>
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
        };

        return (
            <div className={cn(className, styles.component)} ref={ref} data-test-id={dataTestId}>
                <ModalMobile
                    open={open}
                    onClose={handleClose}
                    ref={modalRef}
                    className={styles.modal}
                    wrapperClassName={styles.wrapper}
                >
                    {hasHeader && (
                        <ModalMobile.Header
                            hasCloser={true}
                            title={title}
                            align='center'
                            leftAddons={<div />}
                            sticky={true}
                            className={cn({ [styles.withZIndex]: selectorView === 'full' })}
                        />
                    )}
                    {monthOnlyView && renderDayNames()}
                    <ModalMobile.Content flex={true}>{renderContent()}</ModalMobile.Content>
                    <ModalMobile.Footer
                        sticky={true}
                        className={cn({ [styles.withZIndex]: selectorView === 'full' })}
                    >
                        {renderFooter()}
                    </ModalMobile.Footer>
                </ModalMobile>
            </div>
        );
    },
);

const CalendarMonthOnlyView = ({
    value,
    defaultView,
    month: monthTimestamp,
    minDate: minDateTimestamp,
    maxDate: maxDateTimestamp,
    defaultMonth: defaultMonthTimestamp,
    offDays,
    events,
    holidays,
    onChange,
    selectedFrom,
    selectedTo,
    rangeComplete,
    onMonthChange,
    yearsAmount = 3,
}: CalendarMobileProps) => {
    const initialMonthIndex = useMemo(() => {
        const currentMonthIndex = new Date().getMonth();
        return yearsAmount * 12 + currentMonthIndex;
    }, [yearsAmount]);

    const month = useMemo(() => (monthTimestamp ? new Date(monthTimestamp) : undefined), [
        monthTimestamp,
    ]);

    const minDate = useMemo(() => (minDateTimestamp ? startOfDay(minDateTimestamp) : undefined), [
        minDateTimestamp,
    ]);

    const maxDate = useMemo(() => (maxDateTimestamp ? endOfDay(maxDateTimestamp) : undefined), [
        maxDateTimestamp,
    ]);

    const selected = useMemo(() => (value ? new Date(value) : undefined), [value]);

    const defaultMonth = useMemo(() => {
        return startOfMonth(
            selected ||
                limitDate(defaultMonthTimestamp || Date.now(), minDateTimestamp, maxDateTimestamp),
        );
    }, [defaultMonthTimestamp, maxDateTimestamp, minDateTimestamp, selected]);

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

    const activeMonths = useMemo(() => {
        const eventsMap = dateArrayToHashTable(events || []);
        const offDaysMap = dateArrayToHashTable(offDays || []);
        const holidaysMap = dateArrayToHashTable(holidays || []);
        const prevMonths: Month[] = [];
        const nextMonths: Month[] = [];

        const date = new Date();
        const currentYear = date.getFullYear();

        for (let i = 0; i < yearsAmount; i++) {
            const prevYear = date.setFullYear(currentYear - (i + 1));
            const nextYear = date.setFullYear(currentYear + (i + 1));

            const prevYearMonths = generateMonths(new Date(prevYear), {});
            const nextYearMonths = generateMonths(new Date(nextYear), {});

            prevMonths.unshift(...prevYearMonths);
            nextMonths.push(...nextYearMonths);
        }

        const generatedMonths = [...prevMonths, ...months, ...nextMonths];

        return generatedMonths.map(item => {
            return {
                ...item,
                weeks: generateWeeks(item.date, {
                    minDate,
                    maxDate,
                    selected,
                    eventsMap,
                    offDaysMap,
                    holidaysMap,
                }),
                title: `${monthName(item.date)} ${item.date.getFullYear()}`,
            };
        });
    }, [events, offDays, holidays, months, yearsAmount, minDate, maxDate, selected]);

    const renderMonth = (index: number) => {
        return (
            <div className={styles.daysTable} id={`month-${index}`}>
                <span className={styles.month}>{activeMonths[index].title}</span>
                <DaysTable
                    weeks={activeMonths[index].weeks}
                    activeMonth={activeMonth}
                    selectedFrom={selectedFrom}
                    selectedTo={selectedTo}
                    getDayProps={getDayProps}
                    highlighted={highlighted}
                    rangeComplete={rangeComplete}
                    hasHeader={false}
                    responsive={true}
                />
            </div>
        );
    };

    return (
        <Virtuoso
            totalCount={activeMonths.length}
            itemContent={renderMonth}
            initialTopMostItemIndex={initialMonthIndex}
            increaseViewportBy={800}
            itemSize={el => el.getBoundingClientRect().height + 32}
        />
    );
};
