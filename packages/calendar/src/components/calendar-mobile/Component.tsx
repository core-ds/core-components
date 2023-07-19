import React, { forwardRef, useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';
import endOfDay from 'date-fns/endOfDay';
import getMonth from 'date-fns/getMonth';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';

import { Button } from '@alfalab/core-components-button';
import { ModalMobile } from '@alfalab/core-components-modal/mobile';

import { limitDate, monthName, useCalendar, WEEKDAYS } from '../..';
import { CalendarDesktop, CalendarDesktopProps } from '../../Component.desktop';
import { Month } from '../../typings';
import {
    addonArrayToHashTable,
    dateArrayToHashTable,
    generateMonths,
    generateWeeks,
} from '../../utils';
import { DaysTable } from '../days-table';

import styles from './index.module.css';

// ResizeObserverPolyfill необходим для корректной работы react-virtuoso.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
    window.ResizeObserver = ResizeObserverPolyfill;
}

export type CalendarMobileProps = CalendarDesktopProps & {
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
    dayAddons,
    shape = 'rounded',
    scrollableContainer,
}: CalendarMobileProps & {
    scrollableContainer?: HTMLElement;
}) => {
    const initialMonthIndex = useMemo(() => {
        const currentMonthIndex = new Date().getMonth();

        let monthIndex = currentMonthIndex;

        if (value) monthIndex = getMonth(value);
        if (selectedFrom) monthIndex = getMonth(selectedFrom);

        return yearsAmount * 12 + monthIndex;
    }, [selectedFrom, value, yearsAmount]);

    const month = useMemo(
        () => (monthTimestamp ? new Date(monthTimestamp) : undefined),
        [monthTimestamp],
    );

    const minDate = useMemo(
        () => (minDateTimestamp ? startOfDay(minDateTimestamp) : undefined),
        [minDateTimestamp],
    );

    const maxDate = useMemo(
        () => (maxDateTimestamp ? endOfDay(maxDateTimestamp) : undefined),
        [maxDateTimestamp],
    );

    const selected = useMemo(() => (value ? new Date(value) : undefined), [value]);

    const defaultMonth = useMemo(
        () =>
            startOfMonth(
                selected ||
                    limitDate(
                        defaultMonthTimestamp || Date.now(),
                        minDateTimestamp,
                        maxDateTimestamp,
                    ),
            ),
        [defaultMonthTimestamp, maxDateTimestamp, minDateTimestamp, selected],
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
        dayAddons,
    });

    const activeMonths = useMemo(() => {
        const eventsMap = dateArrayToHashTable(events || []);
        const offDaysMap = dateArrayToHashTable(offDays || []);
        const holidaysMap = dateArrayToHashTable(holidays || []);
        const dayAddonsMap = addonArrayToHashTable(dayAddons || []);

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

        return generatedMonths.map((item) => ({
            ...item,
            weeks: generateWeeks(item.date, {
                minDate,
                maxDate,
                selected,
                eventsMap,
                offDaysMap,
                holidaysMap,
                dayAddonsMap,
            }),
            title: `${monthName(item.date)} ${item.date.getFullYear()}`,
        }));
    }, [events, offDays, holidays, dayAddons, months, yearsAmount, minDate, maxDate, selected]);

    const renderMonth = (index: number) => (
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
                shape={shape}
            />
        </div>
    );

    if (!scrollableContainer) return null;

    return (
        <Virtuoso
            totalCount={activeMonths.length}
            itemContent={renderMonth}
            initialTopMostItemIndex={{ index: initialMonthIndex, align: 'center' }}
            increaseViewportBy={1000}
            itemSize={(el) => el.getBoundingClientRect().height + 32}
            customScrollParent={scrollableContainer}
            useWindowScroll={true}
        />
    );
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
        const [modalRef, setModalRef] = useState<HTMLElement>();

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
                        {WEEKDAYS.map((dayName) => (
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
                        scrollableContainer={modalRef}
                        {...commonProps}
                        {...restProps}
                    />
                );
            }

            return (
                <CalendarDesktop
                    responsive={true}
                    className={cn(className, styles.calendar)}
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
                        <Button view='secondary' size='s' block={true} onClick={handleClear}>
                            Сбросить
                        </Button>
                        <Button
                            view='primary'
                            size='s'
                            block={true}
                            onClick={handleClose}
                            disabled={selectButtonDisabled}
                        >
                            Выбрать
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
                    ref={(node: HTMLDivElement) => setModalRef(node)}
                    className={styles.modal}
                    wrapperClassName={styles.wrapper}
                >
                    {hasHeader && (
                        <ModalMobile.Header
                            hasCloser={true}
                            title={title}
                            sticky={true}
                            bottomAddons={renderDayNames()}
                            className={cn({ [styles.withZIndex]: selectorView === 'full' })}
                        />
                    )}
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
