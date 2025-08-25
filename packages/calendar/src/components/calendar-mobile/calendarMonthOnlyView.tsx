import React, { useMemo, useRef } from 'react';
import { Virtuoso } from 'react-virtuoso';
import cn from 'classnames';
import { endOfDay, isAfter, isBefore, isSameMonth, startOfDay, startOfMonth } from 'date-fns';

import { Typography } from '@alfalab/core-components-typography';

import { ActiveMonths, Month } from '../../typings';
import { useCalendar } from '../../useCalendar';
import { useRange } from '../../useRange';
import {
    addonArrayToHashTable,
    dateArrayToHashTable,
    generateMonths,
    generateWeeks,
    getMonthEndTimestamp,
    getMonthStartTimestamp,
    isRangeValue,
    limitDate,
    monthName,
} from '../../utils';
import { DaysTable } from '../days-table';

import { CalendarContentProps } from './typings';

import styles from './index.module.css';

export const CalendarMonthOnlyView = ({
    value,
    mode = 'single',
    rangeBehavior = 'clarification',
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
    yearsAmount = 3,
    dayAddons,
    shape = 'rounded',
    scrollableContainer,
    clickableMonth,
}: CalendarContentProps & {
    clickableMonth?: boolean;
}) => {
    const range = useRange({
        mode,
        value,
        selectedFrom,
        selectedTo,
        rangeBehavior,
        onChange,
    });

    const month = useMemo(
        () => (monthTimestamp ? new Date(monthTimestamp) : undefined),
        [monthTimestamp],
    );

    const minDate = useMemo(
        () => (minDateTimestamp ? startOfDay(minDateTimestamp) : undefined),
        [minDateTimestamp],
    );

    const maxDate = useMemo(() => {
        // блокируем последующие дни после текущего
        if (clickableMonth && !maxDateTimestamp) {
            return new Date();
        }

        return maxDateTimestamp ? endOfDay(maxDateTimestamp) : undefined;
    }, [maxDateTimestamp, clickableMonth]);

    const selected = useMemo(
        () => (range.value ? new Date(range.value) : undefined),
        [range.value],
    );

    const startingDate = useRef(range.value);

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
        view: 'months',
        minDate,
        maxDate,
        selected,
        offDays,
        events,
        onChange: range.onChange,
        dayAddons,
    });

    const activeMonths = useMemo(() => {
        const eventsMap = dateArrayToHashTable(events || []);
        const offDaysMap = dateArrayToHashTable(offDays || []);
        const holidaysMap = dateArrayToHashTable(holidays || []);
        const dayAddonsMap = addonArrayToHashTable(dayAddons || []);

        const prevMonths: Month[] = [];
        const nextMonths: Month[] = [];

        const date = startingDate.current ? new Date(startingDate.current) : new Date();
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

        return generatedMonths.reduce<ActiveMonths[]>((acc, item) => {
            // отсекаем лишние месяцы если задана минимальная дата
            if (minDate && isBefore(item.date, startOfMonth(minDate))) {
                return acc;
            }

            // отсекаем лишние месяцы если задана максимальная дата
            if (maxDate && isAfter(item.date, startOfMonth(maxDate))) {
                return acc;
            }

            return [
                ...acc,
                {
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
                },
            ];
        }, []);
    }, [events, offDays, holidays, dayAddons, minDate, maxDate, yearsAmount, selected]);

    const initialMonthIndex = useMemo(() => {
        const date = range.value || range.selectedFrom || activeMonth.getTime() || Date.now();

        const index = activeMonths.findIndex((m) => isSameMonth(date, m.date));

        return Math.max(index, 0);
    }, [range.value, range.selectedFrom, activeMonth, activeMonths]);

    // заголовок должен становиться активным, если выбран весь доступный период в месяце
    const isMonthActive = (currentMonthIndex: number): boolean => {
        if (!value || !isRangeValue(value) || !value.dateFrom || !value.dateTo) {
            return false;
        }

        const { dateFrom, dateTo } = value;

        const { date: currentMonthDate } = activeMonths[currentMonthIndex];
        const monthStartTimestamp = getMonthStartTimestamp(currentMonthDate);
        const monthEndTimestamp = getMonthEndTimestamp(currentMonthDate);

        // Проверяем, что выбранный диапазон полностью покрывает месяц
        return dateFrom <= monthStartTimestamp && dateTo >= monthEndTimestamp;
    };

    const handleClickMonthLabel = (index: number) => {
        if (!onChange) return;

        const { date: dateActiveMonths } = activeMonths[index];

        // Вычисляем начало и конец месяца, по которому был произведен клик
        const clickedMonthStartTimestamp = getMonthStartTimestamp(dateActiveMonths);
        const clickedMonthEndTimestamp = getMonthEndTimestamp(dateActiveMonths);

        // Если значение не определено или не является диапазоном, то устанавливаем новый диапазон
        if (!value || !isRangeValue(value) || !value.dateFrom || !value.dateTo) {
            onChange(clickedMonthStartTimestamp, clickedMonthEndTimestamp);

            return;
        }

        // Выбранный диапазон дат
        const { dateFrom, dateTo } = value;
        const selectedRangeStartDate = new Date(dateFrom);
        const selectedRangeEndDate = new Date(dateTo);
        const selectedRangeStartTimestamp = getMonthStartTimestamp(selectedRangeStartDate);
        const selectedRangeEndTimestamp = getMonthEndTimestamp(selectedRangeEndDate);

        // Проверяем, является ли выбранный диапазон одним и тем же месяцем
        const isSingleMonthSelected =
            isSameMonth(selectedRangeStartDate, selectedRangeEndDate) &&
            dateFrom <= selectedRangeStartTimestamp &&
            dateTo >= selectedRangeEndTimestamp;
        // Проверяем, является ли кликнутый месяц таким же, что и выбранный диапазон
        const isSameMonthClicked = isSameMonth(selectedRangeStartDate, dateActiveMonths);
        // Проверяем, находится ли кликнутый месяц внутри выбранного диапазона
        const isClickedMonthInsideRange =
            clickedMonthEndTimestamp >= selectedRangeStartTimestamp &&
            clickedMonthStartTimestamp <= selectedRangeEndTimestamp;
        // Проверяем находится ли выбранный диапазон в пределах кликнутого месяца
        const isRangeWithinSingleMonth =
            selectedRangeStartTimestamp === dateFrom && selectedRangeEndTimestamp === dateTo;

        if (isSingleMonthSelected && isSameMonthClicked) {
            onChange();
        } else if (isClickedMonthInsideRange || !isRangeWithinSingleMonth) {
            onChange(clickedMonthStartTimestamp, clickedMonthEndTimestamp);
        } else {
            const newDateFrom = Math.min(selectedRangeStartTimestamp, clickedMonthStartTimestamp);
            const newDateTo = Math.max(selectedRangeEndTimestamp, clickedMonthEndTimestamp);

            onChange(newDateFrom, newDateTo);
        }
    };

    const getMonthLabel = (index: number, isClickableMonth?: boolean) => {
        if (isClickableMonth) {
            return (
                <Typography.Text className={styles.monthTitle} view='primary-small' color='primary'>
                    {activeMonths[index].title}
                </Typography.Text>
            );
        }

        return `\u00A0${activeMonths[index].title}\u00A0`;
    };

    const renderMonth = (index: number) => {
        const isAfterDate = isAfter(activeMonths[index].date, maxDate ?? new Date());

        return (
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
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <span
                        className={cn(styles.month, {
                            ...(clickableMonth && {
                                [styles.clickableMonth]: true,
                                [styles.rectangular]: shape === 'rectangular',
                                [styles.active]: isMonthActive(index),
                                [styles.disabled]: isAfterDate,
                            }),
                        })}
                        {...(clickableMonth && { onClick: () => handleClickMonthLabel(index) })}
                    >
                        {getMonthLabel(index, clickableMonth)}
                    </span>
                )}
                <DaysTable
                    withTransition={false}
                    weeks={activeMonths[index].weeks}
                    activeMonth={activeMonth}
                    selectedFrom={range.selectedFrom}
                    selectedTo={range.selectedTo}
                    getDayProps={getDayProps}
                    highlighted={highlighted}
                    hasHeader={false}
                    responsive={true}
                    shape={shape}
                />
            </div>
        );
    };

    return (
        <Virtuoso
            totalCount={activeMonths.length}
            itemContent={renderMonth}
            initialTopMostItemIndex={{ index: initialMonthIndex ?? 0, align: 'center' }}
            increaseViewportBy={500}
            itemSize={(el) => el.getBoundingClientRect().height + 32}
            customScrollParent={scrollableContainer}
            useWindowScroll={true}
            className={styles.virtuoso}
        />
    );
};
