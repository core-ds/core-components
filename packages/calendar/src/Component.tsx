import React, { forwardRef, MouseEvent, useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';

import { useDidUpdateEffect } from '@alfalab/hooks';

import { DaysTable } from './components/days-table';
import { Header } from './components/header';
import { MonthYearHeader } from './components/month-year-header';
import { MonthsTable } from './components/months-table';
import { PeriodSlider } from './components/period-slider';
import { YearsTable } from './components/years-table';
import { SelectorView,View } from './typings';
import { useCalendar } from './useCalendar';
import { limitDate } from './utils';

import styles from './index.module.css';

export type CalendarProps = {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Вид по умолчанию (выбор дней, месяцев, лет)
     */
    defaultView?: View;

    /**
     * Вид шапки — месяц и год или только месяц
     */
    selectorView?: SelectorView;

    /**
     * Выбранная дата (timestamp)
     */
    value?: number;

    /**
     * Открытый месяц (timestamp)
     */
    month?: number;

    /**
     * Месяц, открытый по умолчанию (timestamp)
     */
    defaultMonth?: number;

    /**
     * Минимальная дата, доступная для выбора (timestamp)
     */
    minDate?: number;

    /**
     * Максимальная дата, доступная для выбора (timestamp)
     */
    maxDate?: number;

    /**
     * Начало выделенного периода (timestamp)
     */
    selectedFrom?: number;

    /**
     * Конец выделенного периода (timestamp)
     */
    selectedTo?: number;

    /**
     * Индикатор, что выбран полный период
     */
    rangeComplete?: boolean;

    /**
     * Список событий
     */
    events?: Array<Date | number>;

    /**
     * Список отключенных для выбора дней.
     */
    offDays?: Array<Date | number>;

    /**
     * Список выходных
     */
    holidays?: Array<Date | number>;

    /**
     * Обработчик изменения месяца (или года)
     */
    onMonthChange?: (month: number) => void;

    /**
     * Обработчик выбора даты
     */
    onChange?: (date?: number) => void;

    /**
     * Обработчик нажатия на кнопку месяца
     */
    onMonthClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик нажатия на кнопку года
     */
    onYearClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Нужно ли рендерить шапку календаря
     */
    hasHeader?: boolean;

    /**
     * Должен ли календарь подстраиваться под ширину родителя.
     */
    responsive?: boolean;
};

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
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
            holidays,
            onChange,
            onMonthChange,
            onMonthClick,
            onYearClick,
            dataTestId,
            hasHeader = true,
            responsive,
        },
        ref,
    ) => {
        const [view, setView] = useState<View>(defaultView);
        const [scrolled, setScrolled] = useState(false);

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

        const {
            activeMonth,
            weeks,
            months,
            years,
            canSetPrevMonth,
            canSetNextMonth,
            setMonthByDate,
            setPrevMonth,
            setNextMonth,
            highlighted,
            getDayProps,
            getMonthProps,
            getYearProps,
            getRootProps,
        } = useCalendar({
            month,
            defaultMonth,
            view,
            minDate,
            maxDate,
            selected,
            offDays,
            events,
            holidays,
            onChange,
            onMonthChange,
        });

        const toggleView = useCallback(
            (newView: View) => {
                setView(view === newView ? 'days' : newView);
            },
            [view],
        );

        const handleScroll = useCallback((scrollTop: number) => {
            setScrolled(scrollTop > 0);
        }, []);

        const handlePrevArrowClick = useCallback(() => {
            // TODO: Что должны делать стрелки при view !== days?
            setPrevMonth();
        }, [setPrevMonth]);

        const handleNextArrowClick = useCallback(() => {
            setNextMonth();
        }, [setNextMonth]);

        const handleMonthClick = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                toggleView('months');

                if (onMonthClick) {
                    onMonthClick(event);
                }
            },
            [onMonthClick, toggleView],
        );

        const handleYearClick = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                toggleView('years');

                if (onYearClick) {
                    onYearClick(event);
                }
            },
            [onYearClick, toggleView],
        );

        useDidUpdateEffect(() => {
            setView('days');
        }, [activeMonth]);

        useDidUpdateEffect(() => {
            setScrolled(false);
        }, [view]);

        useDidUpdateEffect(() => {
            const newMonth = value && startOfMonth(value);

            if (newMonth && newMonth.getTime() !== activeMonth.getTime()) {
                setMonthByDate(newMonth);
            }
        }, [value]);

        return (
            <div
                {...getRootProps({ ref })}
                className={cn('cc-calendar', styles.component, className, {
                    [styles.sixWeeks]: weeks.length === 6,
                    [styles.responsive]: responsive,
                })}
                data-test-id={dataTestId}
            >
                {hasHeader && (
                    <Header view={selectorView} withShadow={scrolled}>
                        {selectorView === 'month-only' ? (
                            <PeriodSlider
                                className={styles.period}
                                value={activeMonth}
                                periodType='month'
                                prevArrowDisabled={!canSetPrevMonth}
                                nextArrowDisabled={!canSetNextMonth}
                                hideDisabledArrows={true}
                                onPrevArrowClick={handlePrevArrowClick}
                                onNextArrowClick={handleNextArrowClick}
                            />
                        ) : (
                            <MonthYearHeader
                                className={styles.monthYear}
                                value={activeMonth}
                                onMonthClick={handleMonthClick}
                                onYearClick={handleYearClick}
                            />
                        )}
                    </Header>
                )}

                <div className={cn(styles.container, styles[view])}>
                    {view === 'days' && (
                        <DaysTable
                            weeks={weeks}
                            activeMonth={activeMonth}
                            selectedFrom={selectedFrom}
                            selectedTo={selectedTo}
                            getDayProps={getDayProps}
                            highlighted={highlighted}
                            rangeComplete={rangeComplete}
                            responsive={responsive}
                        />
                    )}

                    {view === 'months' && (
                        <MonthsTable
                            selectedMonth={activeMonth}
                            months={months}
                            getMonthProps={getMonthProps}
                            responsive={responsive}
                        />
                    )}

                    {view === 'years' && (
                        <YearsTable
                            selectedYear={activeMonth}
                            years={years}
                            getYearProps={getYearProps}
                            onScroll={handleScroll}
                            responsive={responsive}
                        />
                    )}
                </div>
            </div>
        );
    },
);
