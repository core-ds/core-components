import React, { forwardRef, useMemo, useState } from 'react';
import mergeRefs from 'react-merge-refs';
import { Virtuoso } from 'react-virtuoso';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import cn from 'classnames';
import endOfDay from 'date-fns/endOfDay';
import isSameMonth from 'date-fns/isSameMonth';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';

import { ButtonMobile } from '@alfalab/core-components-button/mobile';
import { ModalMobile } from '@alfalab/core-components-modal/mobile';

import { CalendarDesktop, CalendarDesktopProps } from '../../Component.desktop';
import { Month } from '../../typings';
import { useCalendar } from '../../useCalendar';
import {
    addonArrayToHashTable,
    dateArrayToHashTable,
    generateMonths,
    generateWeeks,
    limitDate,
    monthName,
    WEEKDAYS,
} from '../../utils';
import { DaysTable } from '../days-table';

import backdropTransitionStyles from './backdrop-transitions.module.css';
import styles from './index.module.css';
import transitionStyles from './transitions.module.css';

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
     * Обработчик клика на название месяца в мобильном календаре
     */
    onMonthTitleClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;

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
    onMonthTitleClick,
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

    const { activeMonth, highlighted, getDayProps } = useCalendar({
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
        const currYearMonths = generateMonths(date, {});

        for (let i = 0; i < yearsAmount; i++) {
            const prevYear = date.setFullYear(currentYear - (i + 1));
            const nextYear = date.setFullYear(currentYear + (i + 1));

            const prevYearMonths = generateMonths(new Date(prevYear), {});
            const nextYearMonths = generateMonths(new Date(nextYear), {});

            prevMonths.unshift(...prevYearMonths);
            nextMonths.push(...nextYearMonths);
        }

        const generatedMonths = [...prevMonths, ...currYearMonths, ...nextMonths];

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
    }, [events, offDays, holidays, dayAddons, yearsAmount, minDate, maxDate, selected]);

    const initialMonthIndex = useMemo(() => {
        const date = value || selectedFrom || Date.now();

        return activeMonths.findIndex((m) => isSameMonth(date, m.date));
    }, [activeMonths, selectedFrom, value]);

    const renderMonth = (index: number) => (
        <div className={styles.daysTable} id={`month-${index}`}>
            {onMonthTitleClick ? (
                /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */
                <span
                    className={styles.month}
                    onClick={onMonthTitleClick}
                    tabIndex={0}
                    role='button'
                >
                    {activeMonths[index].title}
                </span>
            ) : (
                <span className={styles.month}> {activeMonths[index].title} </span>
            )}
            <DaysTable
                withTransition={false}
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

    return (
        <Virtuoso
            totalCount={activeMonths.length}
            itemContent={renderMonth}
            initialTopMostItemIndex={{ index: initialMonthIndex ?? 0, align: 'center' }}
            increaseViewportBy={500}
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
            onMonthTitleClick,
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

        const renderDayNames = () =>
            monthOnlyView ? (
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
            ) : null;

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
                        onMonthTitleClick={onMonthTitleClick}
                        {...commonProps}
                        {...restProps}
                    />
                );
            }

            return (
                <CalendarDesktop
                    responsive={true}
                    className={cn(className, styles.calendar)}
                    headerClassName={styles.header}
                    contentClassName={styles.content}
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
                        <ButtonMobile view='secondary' size='m' block={true} onClick={handleClear}>
                            Сбросить
                        </ButtonMobile>
                        <ButtonMobile
                            view='primary'
                            size='m'
                            block={true}
                            onClick={handleClose}
                            disabled={selectButtonDisabled}
                        >
                            Выбрать
                        </ButtonMobile>
                    </React.Fragment>
                );
            }

            if (value) {
                return (
                    <ButtonMobile view='primary' size='m' block={true} onClick={handleClose}>
                        Выбрать
                    </ButtonMobile>
                );
            }

            return (
                <ButtonMobile view='secondary' size='m' block={true} onClick={handleClose}>
                    Отмена
                </ButtonMobile>
            );
        };

        return (
            <ModalMobile
                open={open}
                onClose={handleClose}
                ref={mergeRefs([(node: HTMLDivElement) => setModalRef(node), ref])}
                className={className}
                wrapperClassName={styles.wrapper}
                transitionProps={{
                    timeout: 360,
                    classNames: transitionStyles,
                }}
                backdropProps={{
                    transitionClassNames: backdropTransitionStyles,
                    timeout: 360,
                }}
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
        );
    },
);
